// src/components/narratives/NarrativesSideMediaPanel.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../scss/narratives_sideMediaPanel.scss";
import "../../scss/narratives_narrativeMedia.scss"; // 🔥 reutiliza footer hover
// src/components/narratives/NarrativesSideMediaPanel.jsx
export default function NarrativesSideMediaPanel({ chapter }) {
  if (!chapter?.media?.length) return null;

  // Media destinada explícitamente al panel lateral
  const sideMedia = chapter.media.filter(
    (item) => item.target === "side"
  );

  if (!sideMedia.length) return null;

  return (
    <div className="side-media-panel">
      {sideMedia.map((item, idx) => (
        <div
          key={`${item.src}-${idx}`}
          className="side-media-wrapper"
        >
          {/* 🔥 Figura visual (imagen/video + footer) */}
          <div className="side-media-figure">
            {item.type === "image" && (
              <img
                src={item.src}
                className="side-media-img"
                style={{ opacity: item.opacity ?? 1 }}
                alt=""
              />
            )}

            {item.type === "video" && (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="side-media-video"
                style={{ opacity: item.opacity ?? 1 }}
              />
            )}

            {/* Footer visible solo en hover */}
            {item.footer && (
              <div className="media-footer">
                {item.footer}
              </div>
            )}
          </div>

          {/* Caption / credit fuera del clipping */}
          {(item.caption || item.credit) && (
            <div className="side-media-caption">
              {item.caption && <p>{item.caption}</p>}
              {item.credit && (
                <span className="credit">{item.credit}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
