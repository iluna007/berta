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

  // Load layer definitions
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
  // RECREATE LAYER (aplica overrides con sistema óptimo)
  // ------------------------------------------------------
  const recreateLayer = async (layerId, styleOverrides = {}) => {
    if (!layersRef.current || !map.current) return;

    const def = layersRef.current.find((l) => l.id === layerId);
    if (!def) {
      console.warn("⚠ No hay entrada en geojsonLayers2.json para:", layerId);
      return;
    }

    const url = def.url;
    const baseColor = def.color ?? "#ff00ff";

    const sourceId = `src-${layerId}`;
    const mapLayerId = `layer-${layerId}`;

    // Remove old layer + source
    if (map.current.getLayer(mapLayerId)) map.current.removeLayer(mapLayerId);
    if (map.current.getSource(sourceId)) map.current.removeSource(sourceId);

    try {
      const res = await fetch(url);
      const data = await res.json();

      map.current.addSource(sourceId, { type: "geojson", data });

      const geom = data.features?.[0]?.geometry?.type;

      // BASE LAYER
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

      // -----------------------------------------
      // ⭐ OVERRIDES ELEGANTES (sin mil ifs)
      // -----------------------------------------

      // Tabla de propiedades válidas por tipo
      const STYLE_MAP = {
  fill: [
    "fill-color",
    "fill-opacity",
    "fill-outline-color",
    "fill-translate",
    "fill-translate-anchor",
    "fill-antialias"
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
    "line-cap"
  ],

  circle: [
    "circle-color",
    "circle-opacity",
    "circle-radius",
    "circle-blur",
    "circle-stroke-color",
    "circle-stroke-width",
    "circle-translate",
    "circle-translate-anchor"
  ],

  symbol: [
    "icon-image",
    "icon-size",
    "icon-opacity",
    "icon-color",
    "text-field",
    "text-color",
    "text-opacity",
    "text-halo-color",
    "text-halo-width",
    "text-size",
    "text-letter-spacing",
    "text-justify",
    "text-translate",
    "text-translate-anchor"
  ]
};


      // Mapping JS → Mapbox
      const MAP_JS = {
  // ---- FILLS (Polygon) ----
  fillColor: "fill-color",
  fillOpacity: "fill-opacity",
  fillOutlineColor: "fill-outline-color",
  fillTranslate: "fill-translate",
  fillTranslateAnchor: "fill-translate-anchor",
  fillAntialias: "fill-antialias",

  // ---- LINES ----
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

  // ---- CIRCLES (POINTS) ----
  pointColor: "circle-color",
  pointOpacity: "circle-opacity",
  pointRadius: "circle-radius",
  pointBlur: "circle-blur",
  pointStrokeColor: "circle-stroke-color",
  pointStrokeWidth: "circle-stroke-width",
  pointTranslate: "circle-translate",
  pointTranslateAnchor: "circle-translate-anchor",

  // ---- SYMBOLS (ICONOS / LABELS) ----
  iconImage: "icon-image",
  iconSize: "icon-size",
  iconOpacity: "icon-opacity",
  iconColor: "icon-color",
  textField: "text-field",
  textColor: "text-color",
  textOpacity: "text-opacity",
  textHaloColor: "text-halo-color",
  textHaloWidth: "text-halo-width",
  textSize: "text-size",
  textLetterSpacing: "text-letter-spacing",
  textJustify: "text-justify",
  textTranslate: "text-translate",
  textTranslateAnchor: "text-translate-anchor",

  // ---- RASTER ----
  rasterOpacity: "raster-opacity",
  rasterHueRotate: "raster-hue-rotate",
  rasterBrightnessMin: "raster-brightness-min",
  rasterBrightnessMax: "raster-brightness-max",
  rasterSaturation: "raster-saturation",
  rasterContrast: "raster-contrast",
  rasterFadeDuration: "raster-fade-duration",

  // ---- HEATMAP ----
  heatmapRadius: "heatmap-radius",
  heatmapIntensity: "heatmap-intensity",
  heatmapOpacity: "heatmap-opacity",
  heatmapColor: "heatmap-color",
  heatmapWeight: "heatmap-weight",

  // ---- HILLSHADE ----
  hillshadeIlluminationDirection: "hillshade-illumination-direction",
  hillshadeIlluminationAnchor: "hillshade-illumination-anchor",
  hillshadeExaggeration: "hillshade-exaggeration",
  hillshadeShadowColor: "hillshade-shadow-color",
  hillshadeHighlightColor: "hillshade-highlight-color",
  hillshadeAccentColor: "hillshade-accent-color",

  // ---- BACKGROUND ----
  backgroundColor: "background-color",
  backgroundOpacity: "background-opacity",
  backgroundPattern: "background-pattern",
};

      // Si fill=false → convertir a line
      if (styleOverrides.fill === false && layerType === "fill") {
        layerType = "line";
        paintProps = {
          "line-color": baseColor,
          "line-width": styleOverrides.lineWidth ?? 2,
        };
      }

      // Aplicar overrides válidos según el tipo final
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

      // Insert into top of style
      const topLayer =
        map.current.getStyle().layers.at(-1)?.id;

      map.current.addLayer(layerConfig, topLayer);
    } catch (err) {
      console.error("Error cargando capa:", layerId, err);
    }
  };

  // ------------------------------------------------------
  // Hide dynamic layers
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
  };

  // ------------------------------------------------------
  // CHAPTER CHANGE
  // ------------------------------------------------------
  useEffect(() => {
    if (!map.current) return;
    if (!isMapReady) return;
    if (!activeChapterId) return;
    if (!chapters?.length) return;

    const chapter = chapters.find((c) => c.id === activeChapterId);
    if (!chapter) return;

    const { center, zoom, pitch, bearing } = chapter.location;

    // FLYTO intacto
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
