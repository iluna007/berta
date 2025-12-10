// src/components/narratives/NarrativeLegend.jsx
import "../../scss/narratives_legend.scss";

export default function NarrativeLegend({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="narrative-legend">
      <div className="legend-title">Capas Visibles</div>

      {items.map((item) => {
        const { type, color, label } = item;

        return (
          <div key={label} className="legend-item">
            {type === "fill" && (
              <div
                className="legend-swatch"
                style={{ background: color }}
              />
            )}

            {type === "line" && (
              <div
                className="legend-line"
                style={{ background: color }}
              />
            )}

            {type === "circle" && (
              <div
                className="legend-point"
                style={{ background: color }}
              />
            )}

            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}