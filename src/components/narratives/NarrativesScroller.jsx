// src/components/narratives/NarrativesScroller.jsx

import { useEffect, useState, useRef } from "react";

export default function NarrativesScroller({ onChapterChange }) {
  const [chapters, setChapters] = useState([]);
  const containerRef = useRef(null);

  // 1) Cargar JSON de narrativas
 useEffect(() => {
  fetch("/narratives/narratives.json")
    .then((res) => res.json())
    .then((data) => {
      setChapters(data.chapters);
      window.__NARRATIVES__ = data.chapters;  // ★★★ FIX ★★★
    })
    .catch((err) => console.error("Error cargando narratives.json:", err));
}, []);


  // 2) Observer — solo se activa cuando chapters ya existe y ya fue renderizado
  useEffect(() => {
    if (chapters.length === 0) return; // no crear el observer sin capítulos
    if (!containerRef.current) return;

    // Esperar un micro-tick para que React pinte todo antes de observar
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const chapterId = entry.target.getAttribute("data-id");
              onChapterChange(chapterId);
            }
          });
        },
        {
          root: containerRef.current,
          threshold: 0.6,
        }
      );

      const elements = containerRef.current.querySelectorAll(".chapter-block");
      elements.forEach((el) => observer.observe(el));

      // Clean-up
      return () => observer.disconnect();
    }, 50); // pequeño delay para asegurar render

    return () => clearTimeout(timeout);
  }, [chapters, onChapterChange]);

  // Loading state
  if (chapters.length === 0) {
    return <p style={{ color: "#fff" }}>Cargando narrativas...</p>;
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        overflowY: "auto",
        paddingRight: "12px",
      }}
    >
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          data-id={chapter.id}
          className="chapter-block"
          style={{
            marginBottom: "40px",
            padding: "20px",
            background: "#222",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <h2>{chapter.title}</h2>
          <p style={{ opacity: 0.8 }}>{chapter.description}</p>
        </div>
      ))}
    </div>
  );
}
