import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import config from "../../../../config";

function useLeafletMap(mapId, mapConfig) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && mapId) {
      const map = L.map(mapId)
        .setView(mapConfig.anchor, mapConfig.startZoom)
        .setMinZoom(mapConfig.minZoom)
        .setMaxZoom(mapConfig.maxZoom)
        .setMaxBounds(mapConfig.maxBounds);

      map.keyboard.disable();
      map.zoomControl.remove();
      window.__LEAFLET_MAP__ = map;
      mapRef.current = map;
    }
  }, [mapId, mapConfig]);

  return mapRef.current;
}

const MapContainer = ({ mapId, mapConfig, children }) => {
  const map = useLeafletMap(mapId, mapConfig);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (map && !initialized) {
      setInitialized(true);
    }
  }, [map, initialized]);

  if (!map) return null;

  return children({ map });
};

export default MapContainer;
