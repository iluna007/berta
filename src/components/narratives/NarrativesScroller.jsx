// src/components/narratives/NarrativesScroller.jsx

export default function NarrativesScroller({ chapters, index }) {
  if (!chapters || chapters.length === 0) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        Cargando narrativas…
      </div>
    );
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
          background: "#000a",
          padding: "25px",
          borderRadius: "10px",
          color: "white",
          backdropFilter: "blur(6px)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{chapter.title}</h2>

        <p style={{ opacity: 0.85, lineHeight: "1.5" }}>
          {chapter.description}
        </p>
      </div>
    </div>
  );
}
