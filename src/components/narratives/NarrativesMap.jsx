// src/components/narratives/NarrativesMap.jsx

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "/node_modules/mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmVwcmVzZW50YXJlIiwiYSI6ImNtaHdycWxxbjAycjYyanEzaTN1emtjbmUifQ.q26LsAXIbvhQiWiKhGt0Wg";

export default function NarrativesMap({ activeChapterId, chapters }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [isMapReady, setIsMapReady] = useState(false);

  // GeoJSON layer definitions
  const layersRef = useRef(null);

  // Cache of loaded sources so we don’t reload unnecessarily
  const loadedSources = useRef({});

  // Load layer definitions (geojsonLayers2.json)
  useEffect(() => {
    fetch("/data/geojsonLayers2.json")
      .then((res) => res.json())
      .then((json) => {
        layersRef.current = json;
        console.log("📌 geojsonLayers2.json cargado");
      })
      .catch((err) => console.error("Error cargando geojsonLayers2.json", err));
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/representare/cmiruwsd6004k01s4av98fe2i",
      center: [-86.5, 14.8],
      zoom: 6,
      pitch: 60,
      bearing: 20,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on("load", () => {
      // DEM source (terrain)
      if (!map.current.getSource("mapbox-dem")) {
        map.current.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }

      if (!map.current.getTerrain()) {
        map.current.setTerrain({
          source: "mapbox-dem",
          exaggeration: 1.4,
        });
      }

      console.log("🌄 Terreno 3D activado");
      setIsMapReady(true); // <--- CLAVE
    });
  }, []);

  // ------------------------------------------------------
  // 🔥 Recreate layer ALWAYS to apply new styles
  // ------------------------------------------------------
  const recreateLayer = async (layerId, styleOverrides = {}) => {
    if (!layersRef.current) return;

    const def = layersRef.current.find((l) => l.id === layerId);
    if (!def) {
      console.warn("⚠ No hay entrada en geojsonLayers2.json para:", layerId);
      return;
    }

    const url = def.url;
    const color = def.color ?? "#ff00ff";

    const sourceId = `src-${layerId}`;
    const mapLayerId = `layer-${layerId}`;

    // If layer exists, remove it completely BEFORE recreating it
    if (map.current.getLayer(mapLayerId)) {
      map.current.removeLayer(mapLayerId);
    }
    if (map.current.getSource(sourceId)) {
      map.current.removeSource(sourceId);
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      map.current.addSource(sourceId, {
        type: "geojson",
        data,
      });

      // Determine geometry type
      const geometry = data.features?.[0]?.geometry?.type;

      let layerConfig = {
        id: mapLayerId,
        source: sourceId,
        paint: {},
      };

      if (["Polygon", "MultiPolygon"].includes(geometry)) {
        layerConfig.type = "fill";
        layerConfig.paint = {
          "fill-color": color,
          "fill-opacity": 0.6,
          ...layerConfig.paint,
        };
      } else if (["LineString", "MultiLineString"].includes(geometry)) {
        layerConfig.type = "line";
        layerConfig.paint = {
          "line-color": color,
          "line-width": 3,
          ...layerConfig.paint,
        };
      } else {
        layerConfig.type = "circle";
        layerConfig.paint = {
          "circle-radius": 6,
          "circle-color": color,
          ...layerConfig.paint,
        };
      }

      // -----------------------------------------
      // 🔵 OVERRIDES POR NARRATIVA
      // -----------------------------------------
      if (styleOverrides.fill === false && layerConfig.type === "fill") {
        layerConfig.type = "line";
        layerConfig.paint = {
          "line-color": layerConfig.paint["fill-color"] ?? color,
          "line-width": styleOverrides.lineWidth ?? 2,
        };
      }

      if (styleOverrides.fillColor) {
        layerConfig.paint["fill-color"] = styleOverrides.fillColor;
      }

      if (styleOverrides.fillOpacity !== undefined) {
        layerConfig.paint["fill-opacity"] = styleOverrides.fillOpacity;
      }

      if (styleOverrides.lineColor) {
        layerConfig.paint["line-color"] = styleOverrides.lineColor;
      }

      if (styleOverrides.lineWidth) {
        layerConfig.paint["line-width"] = styleOverrides.lineWidth;
      }

      if (styleOverrides.pointColor) {
        layerConfig.paint["circle-color"] = styleOverrides.pointColor;
      }

      if (styleOverrides.pointRadius) {
        layerConfig.paint["circle-radius"] = styleOverrides.pointRadius;
      }

      // Insert at top of style
      const topLayer =
        map.current.getStyle().layers[
          map.current.getStyle().layers.length - 1
        ]?.id;

      map.current.addLayer(layerConfig, topLayer);
    } catch (err) {
      console.error("Error cargando capa:", layerId, err);
    }
  };

  // Hide all dynamic layers
  const hideAllLayers = () => {
    if (!map.current) return;

    const style = map.current.getStyle();
    if (!style) return;

    style.layers
      .filter((l) => l.id.startsWith("layer-"))
      .forEach((l) => {
        if (map.current.getLayer(l.id)) {
          map.current.setLayoutProperty(l.id, "visibility", "none");
        }
      });
  };

  // ------------------------------------------------------
  // Chapter change
  // ------------------------------------------------------
  useEffect(() => {
    if (!map.current) return;
    if (!isMapReady) return; // <--- PREVIENE ERROR DEL INICIO
    if (!activeChapterId) return;
    if (!chapters?.length) return;

    const chapter = chapters.find((c) => c.id === activeChapterId);
    if (!chapter) return;

    // Move camera
    const { center, zoom, pitch, bearing } = chapter.location;

    map.current.flyTo({
      center,
      zoom,
      pitch: pitch ?? 60,
      bearing,
      duration: 3000,
      speed: 0.5,
      curve: 1.8,
      easing: (t) => t,
      essential: true,
    });

    hideAllLayers();

    // Load layers with style overrides
    chapter.geojsonOn?.forEach((layerId) => {
      const overrides = chapter.layerStyles?.[layerId] || {};
      recreateLayer(layerId, overrides);
    });
  }, [activeChapterId, chapters, isMapReady]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
    />
  );
}
