// src/components/narratives/NarrativeMedia.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../scss/narratives_sideMediaPanel.scss";
import "../../scss/narratives_narrativeMedia.scss";

export default function NarrativeMedia({ chapter }) {
  if (!chapter?.media?.length) return null;

  // 🔥 NUEVO: media destinada al scroller
  const scrollerMedia = chapter.media.filter(
    (item) => item.target !== "side"
  );

  if (!scrollerMedia.length) return null;

  return (
    <div className="narrative-media">
      {scrollerMedia.map((item, idx) => (
        <div key={`${item.src}-${idx}`} className="media-wrapper">
          {item.type === "image" && (
            <img
              src={item.src}
              className="narrative-image"
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
              className="narrative-video"
              style={{ opacity: item.opacity ?? 1 }}
            />
          )}

          {/* 🔥 footer SOLO visible vía hover (ya lo tienes resuelto) */}
          {item.footer && (
            <div className="media-footer">
              {item.footer}
            </div>
          )}

          {item.caption && (
            <p className="media-caption">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
