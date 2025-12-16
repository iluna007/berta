import React, { Component } from "react";
import L from "leaflet";
import PropTypes from "prop-types";

class GeoJsonLayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
      openGroups: {},
      openSubgroups: {}
    };
  }

  componentDidMount() {
    this.loadLayersConfig();
  }

  async loadLayersConfig() {
    try {
      const res = await fetch("/data/geojsonLayers2.json");
      const layersConfig = await res.json();

      const prepared = layersConfig.map((layer) => ({
        ...layer,
        mapLayer: null,
        visible: false
      }));

      this.setState({ layers: prepared });
    } catch (e) {
      console.error("Error cargando geojsonLayers2.json", e);
    }
  }

  toggleGroup(groupName) {
    this.setState((prev) => ({
      openGroups: {
        ...prev.openGroups,
        [groupName]: !prev.openGroups[groupName]
      }
    }));
  }

  toggleSubgroup(subgroupName) {
    this.setState((prev) => ({
      openSubgroups: {
        ...prev.openSubgroups,
        [subgroupName]: !prev.openSubgroups[subgroupName]
      }
    }));
  }

  async toggleLayer(layer) {
    const { map } = this.props;

    if (layer.visible && layer.mapLayer) {
      map.removeLayer(layer.mapLayer);
      layer.mapLayer = null;
      layer.visible = false;
      this.setState({ layers: [...this.state.layers] });
      return;
    }

    if (!layer.url || layer.url.trim() === "") {
      console.warn("Capa sin URL definida:", layer.label);
      return;
    }

    const response = await fetch(layer.url);
    const data = await response.json();
    const SOFT_POINT_GROUPS = new Set(["Improntas", "Los agresores"]);
    const shouldSoft = SOFT_POINT_GROUPS.has(layer.group);

    const paneId = `pane-${layer.label.replace(/\s+/g, "-").toLowerCase()}`;
    if (!map.getPane(paneId)) {
      const pane = map.createPane(paneId);
      pane.style.zIndex = 300;
    }
    
    const mapLayer = L.geoJSON(data, {
      pane: paneId,
      interactive: false,
      style: () => ({
        color: layer.color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3
      }),
      pointToLayer: (feature, latlng) =>
      L.circleMarker(latlng, {
        radius: 5,
        fillColor: layer.color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        className:  shouldSoft
          ? "leaflet-interactive soft-point"
          : "leaflet-interactive"
      })
    });

    mapLayer.addTo(map);

    layer.mapLayer = mapLayer;
    layer.visible = true;

    this.setState({ layers: [...this.state.layers] });
  }

  render() {
    const { layers, openGroups, openSubgroups } = this.state;

    // Agrupar por group → subgroup
    const grouped = {};
    layers.forEach((layer) => {
      if (!grouped[layer.group]) grouped[layer.group] = {};
      if (!grouped[layer.group][layer.subgroup])
        grouped[layer.group][layer.subgroup] = [];
      grouped[layer.group][layer.subgroup].push(layer);
    });

    return (
      <div className="panel-list" style={{ padding: "1rem" }}>
        <h2 className="panel-title">Capas</h2>

        {Object.keys(grouped).map((groupName) => (
          <div key={groupName} style={{ marginBottom: "1rem" }}>
            {/* ----------------- GRUPO ----------------- */}
            <div
              onClick={() => this.toggleGroup(groupName)}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
                marginBottom: "6px"
              }}
            >
              {openGroups[groupName] ? "▼ " : "► "} {groupName}
            </div>

            {openGroups[groupName] &&
              Object.keys(grouped[groupName]).map((subgroupName) => (
                <div key={subgroupName} style={{ marginLeft: "12px" }}>
                  {/* --------------- SUBGRUPO --------------- */}
                  <div
                    onClick={() => this.toggleSubgroup(subgroupName)}
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      marginBottom: "4px",
                      color: "#555"
                    }}
                  >
                    {openSubgroups[subgroupName] ? "▼ " : "► "} {subgroupName}
                  </div>

                  {openSubgroups[subgroupName] &&
                    grouped[groupName][subgroupName].map((layer, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "20px",
                          marginBottom: "4px"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={layer.visible}
                          onChange={() => this.toggleLayer(layer)}
                          style={{
                            width: "14px",
                            height: "14px",
                            cursor: "pointer",
                            marginRight: "8px"
                          }}
                        />

                        <span
                          style={{
                            borderBottom: `2px solid ${layer.color}`,
                            paddingBottom: "1px",
                            fontSize: "13px"
                          }}
                        >
                          {layer.label}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  }
}

GeoJsonLayers.propTypes = {
  map: PropTypes.object.isRequired
};

export default GeoJsonLayers;
