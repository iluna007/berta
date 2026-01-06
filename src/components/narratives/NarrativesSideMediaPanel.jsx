// src/components/narratives/NarrativesSideMediaPanel.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../scss/narratives_sideMediaPanel.scss";
import "../../scss/narratives_narrativeMedia.scss"; // 🔥 reutiliza footer hover

export default function SideMediaPanel({ chapter }) {
  if (!chapter || !chapter.sideMedia || !chapter.media?.length) return null;

  const media = chapter.media[0];

  return (
    <div className="side-media-panel">
      <div className="media-wrapper">
        {media.type === "image" && (
          <img
            src={media.src}
            alt={chapter.title}
            className="side-media-img"
            style={{ opacity: media.opacity ?? 1 }}
          />
        )}

        {media.type === "video" && (
          <video
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            className="side-media-video"
            style={{ opacity: media.opacity ?? 1 }}
          />
        )}

        {/* 🔥 FOOTER HOVER (mismo contrato que NarrativeMedia) */}
        {media.footer && (
          <div className="media-footer">
            {media.footer}
          </div>
        )}
      </div>

      {/* Caption y crédito siguen fuera */}
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
  chapter: PropTypes.object,
};
