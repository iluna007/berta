// src/components/narratives/SideMediaPanel.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../scss/sideMediaPanel.scss";

export default function SideMediaPanel({ chapter }) {
  if (!chapter || !chapter.sideMedia || !chapter.media?.length) return null;

  const media = chapter.media[0];

  return (
    <div className="side-media-panel">
      {media.type === "image" && (
        <img src={media.src} alt={chapter.title} className="side-media-img" />
      )}

      {media.type === "video" && (
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          className="side-media-video"
        />
      )}

      {(media.caption || media.credit) && (
        <div className="side-media-caption">
          {media.caption && <p>{media.caption}</p>}
          {media.credit && <span className="credit">{media.credit}</span>}
        </div>
      )}
    </div>
  );
}

SideMediaPanel.propTypes = {
  chapter: PropTypes.object
};
