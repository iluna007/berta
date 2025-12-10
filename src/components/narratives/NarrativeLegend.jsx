// src/components/narratives/NarrativeLegend.jsx
import "./narratives_legend.scss";

export default function NarrativeLegend({ items, show }) {
  if (!show || !items || items.length === 0) return null;

  return (
    <div className="narrative-legend">
      {items.map((item) => (
        <div className="legend-row" key={item.id}>
          <div className="legend-symbol">
            {item.type === "circle" && (
              <div
                className="legend-point"
                style={{
                  backgroundColor: item.color,
                  border: item.strokeColor
                    ? `${item.strokeWidth || 1}px solid ${item.strokeColor}`
                    : "none",
                }}
              />
            )}

            {item.type === "line" && (
              <div
                className="legend-line"
                style={{ backgroundColor: item.color }}
              />
            )}

            {item.type === "fill" && (
              <div
                className="legend-polygon"
                style={{
                  backgroundColor: item.fillColor,
                  opacity: item.fillOpacity ?? 0.6,
                  border: `2px solid ${item.color}`,
                }}
              />
            )}
          </div>

          <span className="legend-label">{item.id}</span>
        </div>
      ))}
    </div>
  );
}
