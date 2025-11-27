import { useEffect, useRef, useState } from "react";
import Supercluster from "supercluster";
import { isLatitude, isLongitude } from "../../../../../../common/utilities";

export default function useSupercluster(locations, clusterConfig, map) {
  const [clusters, setClusters] = useState([]);
  const [indexLoaded, setIndexLoaded] = useState(false);
  const superclusterRef = useRef(null);

  useEffect(() => {
    superclusterRef.current = new Supercluster(clusterConfig);
    setIndexLoaded(false);

    if (locations && locations.length > 0) {
      const features = locations.reduce((acc, loc) => {
        const { longitude, latitude } = loc;
        if (isLatitude(latitude) && isLongitude(longitude)) {
          acc.push({
            type: "Feature",
            properties: {
              cluster: false,
              id: loc.label,
            },
            geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          });
        }
        return acc;
      }, []);
      superclusterRef.current.load(features);
      setIndexLoaded(true);
    }
  }, [locations, clusterConfig]);

  useEffect(() => {
    if (!map || !indexLoaded) return;
    const updateClusters = () => {
      const bounds = map.getBounds();
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];
      const zoom = map.getZoom();
      setClusters(superclusterRef.current.getClusters(bbox, zoom));
    };
    map.on("moveend zoomend", updateClusters);
    updateClusters();
    return () => {
      map.off("moveend zoomend", updateClusters);
    };
  }, [map, indexLoaded]);

  function getClusterChildren(clusterId) {
    if (!superclusterRef.current) return [];
    try {
      return superclusterRef.current.getLeaves(clusterId, Infinity, 0);
    } catch {
      return [];
    }
  }

  return { clusters, getClusterChildren, indexLoaded };
}
