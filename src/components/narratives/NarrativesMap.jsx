// src/components/narratives/NarrativesMap.jsx

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "/node_modules/mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWtlcmx1bmEiLCJhIjoiY203NjMwZHptMHAzaDJrcXlrbnNuMHJlZiJ9.hkoRlM6gQ-BflcGjpI40GA";

export default function NarrativesMap({ activeChapterId, chapters }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Guardamos las capas activas en memoria
  const activeLayers = useRef({});

  // ----------------------------------------------------------
  // 1) Inicialización del mapa
  // ----------------------------------------------------------
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/ikerluna/cmf6r44f700wq01pl39994oti",
      center: [-86.5, 14.8],
      zoom: 6,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    // FIX del DEM
    map.current.on("style.load", () => {
      if (map.current.getTerrain()) {
        map.current.setTerrain(null);
      }
    });
  }, []);

  // ----------------------------------------------------------
  // 2) Cargar GeoJSONs (solo si no existen) y mostrarlos
  // ----------------------------------------------------------
  const loadGeoJSON = async (filename) => {
    const sourceId = `src-${filename}`;
    const layerId = `layer-${filename}`;

    // Si ya existe, solo lo mostramos
    if (map.current.getLayer(layerId)) {
      map.current.setLayoutProperty(layerId, "visibility", "visible");
      return;
    }

    try {
      const res = await fetch(`/geojson/${filename}`);
      const data = await res.json();

      // Crear la fuente
      map.current.addSource(sourceId, { type: "geojson", data });

      // Detectar si es punto, línea o polígono
      const geometryType = data.features[0].geometry.type;

      let layerConfig = {
        id: layerId,
        source: sourceId,
      };

      if (geometryType.includes("Polygon")) {
        layerConfig.type = "fill";
        layerConfig.paint = {
          "fill-color": "#ff6600",
          "fill-opacity": 0.5,
        };
      } else if (geometryType.includes("Line")) {
        layerConfig.type = "line";
        layerConfig.paint = {
          "line-color": "#00b7ff",
          "line-width": 3,
        };
      } else {
        layerConfig.type = "circle";
        layerConfig.paint = {
          "circle-radius": 6,
          "circle-color": "#ff33aa",
        };
      }

      map.current.addLayer(layerConfig);
      activeLayers.current[layerId] = true;
    } catch (err) {
      console.error(`Error cargando GeoJSON ${filename}:`, err);
    }
  };

  // ----------------------------------------------------------
  // 3) Ocultar GeoJSONs
  // ----------------------------------------------------------
  const hideGeoJSON = (filename) => {
    const layerId = `layer-${filename}`;

    if (map.current.getLayer(layerId)) {
      map.current.setLayoutProperty(layerId, "visibility", "none");
    }
  };

  // ----------------------------------------------------------
  // 4) Cuando cambia el capítulo
  // ----------------------------------------------------------
  useEffect(() => {
    if (!map.current || !activeChapterId || !chapters?.length) return;

    const chapter = chapters.find((c) => c.id === activeChapterId);
    if (!chapter) return;

    // --- Mover cámara ---
    const { center, zoom, pitch, bearing } = chapter.location;

    map.current.flyTo({
      center,
      zoom,
      pitch,
      bearing,
      speed: 0.7,
      curve: 1.5,
    });

    // --- Procesar GeoJSONs (enter/exit) ---

    // Primero ocultar lo que salga
    chapters.forEach((c) => {
      if (c.geojsonOnExit) {
        c.geojsonOnExit.forEach((file) => hideGeoJSON(file));
      }
    });

    // Luego cargar lo que entra
    if (chapter.geojsonOnEnter) {
      chapter.geojsonOnEnter.forEach((file) => loadGeoJSON(file));
    }

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
