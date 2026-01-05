// src/components/narratives/NarrativesMap.jsx

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "/node_modules/mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmVwcmVzZW50YXJlIiwiYSI6ImNtaHdycWxxbjAycjYyanEzaTN1emtjbmUifQ.q26LsAXIbvhQiWiKhGt0Wg";

export default function NarrativesMap({
  activeChapterId,
  chapters,

  // 🔥 NUEVO: Callback para actualizar leyenda
  onLegendChange = () => {}
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [isMapReady, setIsMapReady] = useState(false);

  const layersRef = useRef(null);

  // 🔥 NUEVO: referencia al popup activo
  const activePopupRef = useRef(null);

  // -----------------------------------------
  // Cargar catálogo geojson_narratives.json
  // -----------------------------------------
  useEffect(() => {
    fetch("/data/geojson_narratives.json")
      .then((res) => res.json())
      .then((json) => {
        layersRef.current = json;
        console.log("📌 geojson_narratives.json cargado");
      })
      .catch((err) =>
        console.error("Error cargando geojson_narratives.json", err)
      );
  }, []);

  // -----------------------------------------
  // Inicializar Mapa
  // -----------------------------------------
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/representare/cmj93y2ji002m01s3c3r41vb1",
      center: [-86.5, 14.8],
      zoom: 6,
      pitch: 60,
      bearing: 20,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on("load", () => {
      if (!map.current.getSource("mapbox-dem")) {
        map.current.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }

      if (!map.current.getTerrain()) {
        map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });
      }

      console.log("🌄 Terreno 3D activado");
      setIsMapReady(true);
    });
  }, []);

  // ------------------------------------------------------
  // RECREAR UNA CAPA (siempre nueva para permitir overrides)
  // ------------------------------------------------------
  const recreateLayer = async (layerId, styleOverrides = {}) => {
    if (!layersRef.current || !map.current) return;

    const def = layersRef.current.find((l) => l.id === layerId);
    if (!def) {
      console.warn("⚠ No hay entrada en geojsonLayers2.json para:", layerId);
      return null;
    }

    const baseColor = def.color ?? "#ff00ff";
    const label = def.label ?? layerId;

    // ======================================================
    // 🔥 NUEVO CASO: PUNTO NARRATIVO POR COORDENADA (SIN GEOJSON)
    // ======================================================
    if (def.coordinates && Array.isArray(def.coordinates)) {
      if (activePopupRef.current) {
        activePopupRef.current.remove();
        activePopupRef.current = null;
      }

      const popupData = def.popup || {};

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 14,
      })
        .setLngLat(def.coordinates)
        .setHTML(`
          <strong>${popupData.title ?? ""}</strong>
          ${popupData.date ? `<br/><em>${popupData.date}</em>` : ""}
          ${popupData.description ? `<p>${popupData.description}</p>` : ""}
        `)
        .addTo(map.current);

      activePopupRef.current = popup;

      return {
        id: layerId,
        label,
        color: baseColor,
        type: "point",
      };
    }

    // ======================================================
    // FLUJO ORIGINAL (GeoJSON)
    // ======================================================

    const url = def.url;
    const sourceId = `src-${layerId}`;
    const mapLayerId = `layer-${layerId}`;

    if (map.current.getLayer(mapLayerId))
      map.current.removeLayer(mapLayerId);
    if (map.current.getSource(sourceId))
      map.current.removeSource(sourceId);

    if (activePopupRef.current) {
      activePopupRef.current.remove();
      activePopupRef.current = null;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      map.current.addSource(sourceId, { type: "geojson", data });

      const feature = data.features?.[0];
      const geom = feature?.geometry?.type;
      const popupData = def.popup || null;

      let layerType = "fill";
      let paintProps = {};

      if (["Polygon", "MultiPolygon"].includes(geom)) {
        layerType = "fill";
        paintProps = {
          "fill-color": baseColor,
          "fill-opacity": 0.6,
        };
      } else if (["LineString", "MultiLineString"].includes(geom)) {
        layerType = "line";
        paintProps = {
          "line-color": baseColor,
          "line-width": 3,
        };
      } else {
        layerType = "circle";
        paintProps = {
          "circle-color": baseColor,
          "circle-radius": 6,
        };
      }

      const STYLE_MAP = {
        fill: [
          "fill-color",
          "fill-opacity",
          "fill-outline-color",
          "fill-translate",
          "fill-translate-anchor",
          "fill-antialias",
        ],
        line: [
          "line-color",
          "line-width",
          "line-opacity",
          "line-dasharray",
          "line-translate",
          "line-translate-anchor",
          "line-gap-width",
          "line-blur",
          "line-offset",
          "line-join",
          "line-cap",
        ],
        circle: [
          "circle-color",
          "circle-opacity",
          "circle-radius",
          "circle-blur",
          "circle-stroke-color",
          "circle-stroke-width",
          "circle-translate",
          "circle-translate-anchor",
        ],
      };

      const MAP_JS = {
        fillColor: "fill-color",
        fillOpacity: "fill-opacity",
        fillOutlineColor: "fill-outline-color",
        fillTranslate: "fill-translate",
        fillTranslateAnchor: "fill-translate-anchor",
        fillAntialias: "fill-antialias",
        lineColor: "line-color",
        lineWidth: "line-width",
        lineOpacity: "line-opacity",
        lineDasharray: "line-dasharray",
        lineTranslate: "line-translate",
        lineTranslateAnchor: "line-translate-anchor",
        lineGapWidth: "line-gap-width",
        lineBlur: "line-blur",
        lineOffset: "line-offset",
        lineJoin: "line-join",
        lineCap: "line-cap",
        pointColor: "circle-color",
        pointOpacity: "circle-opacity",
        pointRadius: "circle-radius",
        pointBlur: "circle-blur",
        pointStrokeColor: "circle-stroke-color",
        pointStrokeWidth: "circle-stroke-width",
        pointTranslate: "circle-translate",
        pointTranslateAnchor: "circle-translate-anchor",
      };

      if (styleOverrides.fill === false && layerType === "fill") {
        layerType = "line";
        paintProps = {
          "line-color": baseColor,
          "line-width": styleOverrides.lineWidth ?? 2,
        };
      }

      const allowed = STYLE_MAP[layerType] ?? [];

      allowed.forEach((prop) => {
        const jsProp = Object.keys(MAP_JS).find((k) => MAP_JS[k] === prop);
        if (jsProp && styleOverrides[jsProp] !== undefined) {
          paintProps[prop] = styleOverrides[jsProp];
        }
      });

      const layerConfig = {
        id: mapLayerId,
        type: layerType,
        source: sourceId,
        paint: paintProps,
      };

      const topLayer = map.current.getStyle().layers.at(-1)?.id;
      map.current.addLayer(layerConfig, topLayer);

      if (geom === "Point" && popupData) {
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 14,
        })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(`
            <strong>${popupData.title ?? ""}</strong>
            ${popupData.date ? `<br/><em>${popupData.date}</em>` : ""}
            ${popupData.description ? `<p>${popupData.description}</p>` : ""}
          `)
          .addTo(map.current);

        activePopupRef.current = popup;
      }

      return {
        id: layerId,
        label,
        color:
          layerType === "fill"
            ? paintProps["fill-color"]
            : layerType === "line"
            ? paintProps["line-color"]
            : paintProps["circle-color"],
        type: layerType,
      };
    } catch (err) {
      console.error("Error cargando capa:", layerId, err);
      return null;
    }
  };

  // ------------------------------------------------------
  // Ocultar capas dinámicas
  // ------------------------------------------------------
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

    if (activePopupRef.current) {
      activePopupRef.current.remove();
      activePopupRef.current = null;
    }
  };

  // ------------------------------------------------------
  // CARGA POR CAMBIO DE CAPÍTULO
  // ------------------------------------------------------
  useEffect(() => {
    if (!map.current) return;
    if (!isMapReady) return;
    if (!activeChapterId) return;
    if (!chapters?.length) return;

    const chapter = chapters.find((c) => c.id === activeChapterId);
    if (!chapter) return;

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

    const legendCollector = [];

    const run = async () => {
      for (const layerId of chapter.geojsonOn || []) {
        const overrides = chapter.layerStyles?.[layerId] || {};
        const legendInfo = await recreateLayer(layerId, overrides);
        if (legendInfo) legendCollector.push(legendInfo);
      }

      onLegendChange(legendCollector);
    };

    run();
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
