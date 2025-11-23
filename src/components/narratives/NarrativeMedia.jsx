// src/components/narratives/NarrativeMedia.jsx

import React from "react";
import PropTypes from "prop-types";
import "../../scss/narratives_narrativeMedia.scss";

export default function NarrativeMedia({ chapter }) {
  if (!chapter || !chapter.media || chapter.media.length === 0) return null;

  // ❗ Si es un capítulo con sideMedia, NO mostrar imagen en el panel izquierdo
  if (chapter.sideMedia) return null;

  const item = chapter.media[0];

  return (
    <div className="narrative-media-container">
      {item.type === "image" && (
        <img src={item.src} className="narrative-image" alt="" />
      )}

      {item.type === "video" && (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="narrative-video"
        />
      )}

      {item.caption && <p className="media-caption">{item.caption}</p>}
    </div>
  );
}

NarrativeMedia.propTypes = {
  chapter: PropTypes.object,
};
