import React, { Component } from "react";
import L from "leaflet";
import PropTypes from "prop-types";

class GeoJsonLayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: []
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
      console.error("Error cargando geojsonLayers.json", e);
    }
  }

  async toggleLayer(layer) {
    const { map } = this.props;

    // Apagar capa
    if (layer.visible && layer.mapLayer) {
      map.removeLayer(layer.mapLayer);
      layer.mapLayer = null;
      layer.visible = false;
      this.setState({ layers: [...this.state.layers] });
      return;
    }

    // Encender capa
    const response = await fetch(layer.url);
    const data = await response.json();

    // Crear pane para mantener orden visual
    const paneId = `pane-${layer.label.replace(/\s+/g, "-").toLowerCase()}`;
    if (!map.getPane(paneId)) {
      const pane = map.createPane(paneId);
      pane.style.zIndex = 450;
    }

    const mapLayer = L.geoJSON(data, {
      pane: paneId,

      // Estilo original (líneas + polígonos)
      style: () => ({
        color: layer.color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3
      }),

      // Estilo ORIGINAL de puntos (con glow)
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 5,
          fillColor: layer.color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
          className: "leaflet-interactive soft-point" // <- glow original restaurado
        })
    });

    mapLayer.addTo(map);

    layer.mapLayer = mapLayer;
    layer.visible = true;

    this.setState({ layers: [...this.state.layers] });
  }

  render() {
    const { layers } = this.state;

    return (
      <div className="panel-list" style={{ padding: "1rem" }}>
        <h2 className="panel-title">Capas GeoJSON</h2>

        {layers.map((layer, index) => (
          <div
            key={index}
            className="panel-action action"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem"
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
                paddingBottom: "2px",
                fontSize: "14px"
              }}
            >
              {layer.label}
            </span>
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
