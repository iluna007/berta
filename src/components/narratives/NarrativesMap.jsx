// src/components/narratives/NarrativesMap.jsx

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "/node_modules/mapbox-gl/dist/mapbox-gl.css";  // ← ESTA LÍNEA VA AQUÍ


export default function NarrativesMap({ activeChapterId }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // TOKEN — por ahora hardcoded, luego lo movemos a config
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaWtlcmx1bmEiLCJhIjoiY203NjMwZHptMHAzaDJrcXlrbnNuMHJlZiJ9.hkoRlM6gQ-BflcGjpI40GA";

  // Inicializar el mapa
  useEffect(() => {
  if (map.current) return;

  map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/ikerluna/cmf6r44f700wq01pl39994oti",
    center: [-83, 10],
    zoom: 6
  });

  map.current.addControl(new mapboxgl.NavigationControl());

  // 💥 FIX AL PROBLEMA DEL DEM
  map.current.on("style.load", () => {
    if (map.current.getTerrain()) {
      map.current.setTerrain(null);   // ← le dice “no uses dem”
    }
  });

}, []);

  // Mover la cámara según el capítulo activo
useEffect(() => {
  if (!map.current || !activeChapterId) return;

  // buscar capítulo dentro del JSON cargado por el scroller
  const chapter = window.__NARRATIVES__.find(c => c.id === activeChapterId);
  if (!chapter) return;

  const { center, zoom, pitch, bearing } = chapter.location;

  map.current.flyTo({
    center,
    zoom,
    pitch,
    bearing,
    speed: 0.7,
    curve: 1.2,
  });
}, [activeChapterId]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    />
  );
}
