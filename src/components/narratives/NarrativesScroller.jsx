// src/components/narratives/NarrativesScroller.jsx
import NarrativeMedia from "./NarrativeMedia";

export default function NarrativesScroller({ chapters, index }) {
  if (!chapters || chapters.length === 0) {
    return <p style={{ color: "#fff" }}>Cargando narrativas...</p>;
  }

  const chapter = chapters[index];

  return (
    <div
      style={{
        height: "100%",
        overflow: "hidden",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "#0008",
          padding: "25px",
          borderRadius: "10px",
          color: "white",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2>{chapter.title}</h2>

        {/* Soporte para 1 párrafo (string) o varios (array) */}
        {Array.isArray(chapter.description) ? (
          chapter.description.map((paragraph, i) => (
            <p
              key={i}
              style={{ opacity: 0.85, marginBottom: "1em", whiteSpace: "pre-line" }}
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p style={{ opacity: 0.85, whiteSpace: "pre-line" }}>
            {chapter.description}
          </p>
        )}

        <NarrativeMedia chapter={chapter} />
      </div>
    </div>
  );
}
