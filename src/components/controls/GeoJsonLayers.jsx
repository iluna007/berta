import { useEffect, useState } from "react";
import L from "leaflet";
import PropTypes from "prop-types";

/**
 * Componente de panel para activar/desactivar capas GeoJSON desde la Toolbar.
 * Compatible con Leaflet y Map.jsx.
 */
const GeoJsonLayers = ({ map, layersConfig }) => {
  const [layers, setLayers] = useState(
    layersConfig.map(l => ({ ...l, visible: false, layer: null }))
  );

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      layers.forEach(l => {
        if (map && l.layer) map.removeLayer(l.layer);
      });
    };
  }, [map]);

  const toggleLayer = async (idx) => {
    setLayers(prev => {
      const updated = [...prev];
      const target = updated[idx];

      if (!target.visible) {
        fetch(target.url)
          .then(res => res.json())
          .then(data => {

            const geoLayer = L.geoJSON(data, {

              /** 🔴 DESACTIVA INTERACTIVIDAD PARA TODO TYPE */
              interactive: false,

              /** Estilo para líneas y polígonos */
              style: () => ({
                color: target.color || "#0077be",
                weight: target.weight || 2,
                fillOpacity: target.fillOpacity ?? 0.3,
                interactive: false   // <- también aquí por seguridad
              }),

              /** Estilo para puntos */
              pointToLayer: (feature, latlng) =>
                L.circleMarker(latlng, {
                  radius: 5,
                  fillColor: target.color || "#ff7800",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8,
                  className: "leaflet-interactive soft-point",

                })
            });

            geoLayer.addTo(map);

            updated[idx] = { ...target, visible: true, layer: geoLayer };
            setLayers([...updated]);
          });

      } else {
        if (target.layer) map.removeLayer(target.layer);
        updated[idx] = { ...target, visible: false, layer: null };
        setLayers([...updated]);
      }

      return updated;
    });
  };

  return (
    <div className="geojson-layers-panel" style={{ padding: "1rem" }}>
      <h2>Capas</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {layers.map((l, i) => (
          <li key={i} style={{ marginBottom: "0.5rem" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={l.visible}
                onChange={() => toggleLayer(i)}
                style={{ marginRight: "8px" }}
              />
              {l.label || l.url}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

GeoJsonLayers.propTypes = {
  map: PropTypes.object.isRequired,
  layersConfig: PropTypes.array.isRequired,
};

export default GeoJsonLayers;
