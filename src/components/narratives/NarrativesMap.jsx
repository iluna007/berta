// src/components/narratives/NarrativesMap.jsx

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "/node_modules/mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWtlcmx1bmEiLCJhIjoiY203NjMwZHptMHAzaDJrcXlrbnNuMHJlZiJ9.hkoRlM6gQ-BflcGjpI40GA";

export default function NarrativesMap({ activeChapterId, chapters }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Cache de capas activas
  const activeLayers = useRef({});

  // Cargar definición de capas (geojsonLayers2.json)
  const layersRef = useRef(null);

  useEffect(() => {
    fetch("/data/geojsonLayers2.json")
      .then((res) => res.json())
      .then((json) => {
        layersRef.current = json;
        console.log("📌 geojsonLayers2.json cargado");
      })
      .catch((err) => console.error("Error cargando geojsonLayers2.json", err));
  }, []);

  // Inicialización del mapa
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/ikerluna/cmicitjth00b701s4aarcc81h",
      center: [-86.5, 14.8],
      zoom: 6,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    // Eliminar terreno (arreglar error "Couldn't find terrain source mapbox-dem")
    map.current.on("style.load", () => {
      if (map.current.getTerrain()) {
        map.current.setTerrain(null);
      }
    });
  }, []);

  // Cargar una capa desde layersRef (por ID)
  const loadGeoLayer = async (layerId) => {
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

    if (map.current.getLayer(mapLayerId)) {
      map.current.setLayoutProperty(mapLayerId, "visibility", "visible");
      return;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      map.current.addSource(sourceId, { type: "geojson", data });

      const geometry = data.features?.[0]?.geometry?.type;

      let layerConfig = {
        id: mapLayerId,
        source: sourceId,
      };

      if (["Polygon", "MultiPolygon"].includes(geometry)) {
        layerConfig.type = "fill";
        layerConfig.paint = {
          "fill-color": color,
          "fill-opacity": 0.6,
        };
      } else if (["LineString", "MultiLineString"].includes(geometry)) {
        layerConfig.type = "line";
        layerConfig.paint = {
          "line-color": color,
          "line-width": 3,
        };
      } else {
        layerConfig.type = "circle";
        layerConfig.paint = {
          "circle-radius": 6,
          "circle-color": color,
        };
      }

      // Insertar siempre arriba del estilo → soluciona capas negras
      const topLayer =
        map.current.getStyle().layers[
          map.current.getStyle().layers.length - 1
        ]?.id;

      map.current.addLayer(layerConfig, topLayer);
      activeLayers.current[mapLayerId] = true;
    } catch (err) {
      console.error("Error cargando capa:", layerId, err);
    }
  };

  const hideGeoLayer = (layerId) => {
    const mapLayerId = `layer-${layerId}`;
    if (map.current.getLayer(mapLayerId)) {
      map.current.setLayoutProperty(mapLayerId, "visibility", "none");
    }
  };

  // Cuando cambia el capítulo
  useEffect(() => {
    if (!map.current || !activeChapterId || !chapters?.length) return;

    const chapter = chapters.find((c) => c.id === activeChapterId);
    if (!chapter) return;

    const { center, zoom, pitch, bearing } = chapter.location;

    map.current.flyTo({
      center,
      zoom,
      pitch,
      bearing,
      duration: 3500,
      speed: 0.5,
      curve: 1.8,
      easing: (t) => t,
      essential: true,
    });

    // Ocultar lo que sale
    chapters.forEach((c) => {
      c.geojsonOnExit?.forEach((id) => hideGeoLayer(id));
    });

    // Cargar lo que entra
    chapter.geojsonOnEnter?.forEach((id) => loadGeoLayer(id));
  }, [activeChapterId, chapters]);

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
