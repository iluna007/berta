// src/components/narratives/NarrativeMedia.jsx

import React from "react";
import PropTypes from "prop-types";
import "../../scss/narratives_narrativeMedia.scss";
export default function NarrativeMedia({ chapter }) {
  if (!chapter?.media?.length) return null;

  // Si es un capítulo con sideMedia, NO mostrar media en el panel izquierdo
  if (chapter.sideMedia) return null;

  return (
    <div className="narrative-media-container">
      {chapter.media.map((item, idx) => (
        <div key={`${item.src}-${idx}`} style={{ marginTop: idx === 0 ? 0 : 12 }}>
          {item.type === "image" && (
            <img
              src={item.src}
              className="narrative-image"
              alt=""
              style={{ opacity: item.opacity ?? 1 }}
            />
          )}

          {item.type === "video" && (
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="narrative-video"
              style={{ opacity: item.opacity ?? 1 }}
            />
          )}

          {item.caption && <p className="media-caption">{item.caption}</p>}
        </div>
      ))}
    </div>
  );
}

NarrativeMedia.propTypes = { chapter: PropTypes.object };