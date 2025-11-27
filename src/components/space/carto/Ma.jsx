import { useRef } from "react";
import MapContainer from "./atoms/MapContainer";
import useSupercluster from "./atoms/useSupercluster";
import { createProjectPoint } from "./atoms/projectPoint";
import MapInner from "./atoms/MapInner";

const Map = ({ app, domain, ui, ...props }) => {
  console.log("app:", app);
  console.log("domain:", domain);
  console.log("ui:", ui);

  if (!app || !app.map || !domain || !ui || !ui.dom || !ui.dom.map) {
    return <div>Error: datos de configuración incompletos</div>;
  }

  const svgRef = useRef(null);
  const mapConfig = app.map;
  const mapId = ui.dom.map;

  return (
    <MapContainer mapId={mapId} mapConfig={mapConfig}>
      {({ map }) => {
        if (!map) return null;
        const { clusters, getClusterChildren, indexLoaded } = useSupercluster(
          domain.locations,
          app.cluster,
          map
        );
        const projectPoint = createProjectPoint(map, 0, 0);
        return (
          <MapInner
            map={map}
            clusters={clusters}
            getClusterChildren={getClusterChildren}
            projectPoint={projectPoint}
            app={app}
            domain={domain}
            ui={ui}
            svgRef={svgRef}
          />
        );
      }}
    </MapContainer>
  );
};

export default Map;
