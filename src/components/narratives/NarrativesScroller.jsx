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
        <p style={{ opacity: 0.85, whiteSpace: "pre-line" }}>
          {chapter.description}
        </p>

        {/* AQUÍ se renderiza la media */}
        <NarrativeMedia chapter={chapter} />
      </div>
    </div>
  );
}
