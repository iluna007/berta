// src/components/narratives/NarrativeMedia.jsx

export default function NarrativeMedia({ chapter }) {
  if (!chapter || !chapter.media || chapter.media.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        marginTop: "20px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      {chapter.media.map((m, i) => {
        if (m.type === "image") {
          return (
            <img
              key={i}
              src={m.src}
              alt=""
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
                opacity: m.opacity ?? 1,
                display: "block"
              }}
            />
          );
        }

        if (m.type === "video") {
          return (
            <video
              key={i}
              src={m.src}
              autoPlay={m.autoplay}
              loop={m.loop}
              muted={m.muted}
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: "10px",
                opacity: m.opacity ?? 1,
                display: "block"
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
