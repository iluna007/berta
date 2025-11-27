import Sites from "./Sites";
import Regions from "./Regions";
import Events from "./Events";
import Clusters from "./Clusters";
import SelectedEvents from "./SelectedEvents";
import Narratives from "./Narratives";
import DefsMarkers from "./DefsMarkers";
import SatelliteOverlayToggle from "./SatelliteOverlayToggle";

const MapInner = ({
  map,
  clusters,
  getClusterChildren,
  projectPoint,
  app,
  domain,
  ui,
  onClusterSelect,
  styleLocation,
  svgRef
}) => {
  return (
    <>
      <DefsMarkers />
      <SatelliteOverlayToggle />
      <Clusters
        clusters={clusters}
        getClusterChildren={getClusterChildren}
        projectPoint={projectPoint}
        onSelect={onClusterSelect}
        svg={svgRef.current}
      />
      <Sites
        sites={domain.sites}
        projectPoint={projectPoint}
        isEnabled={app.views.sites}
      />
      <Regions
        svg={svgRef.current}
        regions={domain.regions}
        projectPoint={projectPoint}
        styles={ui.regions}
      />
      <Events />
      <SelectedEvents />
      <Narratives />
    </>
  );
};

export default MapInner;
