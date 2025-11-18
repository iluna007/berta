// src/components/NarrativePage.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hook_restore } from "../actions/hook_restore";

import NarrativesScroller from "./narratives/NarrativesScroller";
import NarrativesMap from "./narratives/NarrativesMap";

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeChapterId, setActiveChapterId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);

  // 1) Cargar JSON
  useEffect(() => {
    fetch("/narratives/narratives.json")
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.chapters);
        setActiveChapterId(data.chapters[0].id);
      });
  }, []);

  // 2) Scroll global: funciona sobre mapa y panel
  useEffect(() => {
    if (chapters.length === 0) return;

    const handler = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setIndex((i) => Math.min(i + 1, chapters.length - 1));
      } else {
        setIndex((i) => Math.max(i - 1, 0));
      }
    };

    // Escuchar sobre toda la página
    window.addEventListener("wheel", handler, { passive: false });

    return () => window.removeEventListener("wheel", handler);
  }, [chapters.length]);

  // 3) Aplicar capítulo activo
  useEffect(() => {
    if (chapters.length > 0) {
      setActiveChapterId(chapters[index].id);
    }
  }, [index, chapters]);

  const goBack = async () => {
    await dispatch(hook_restore());
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "#000",
      }}
    >
      {/* Botón volver */}
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 5,
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← BACK TO PLATFORM
      </button>

      {/* Mapa */}
      <div style={{ position: "absolute", inset: 0 }}>
        <NarrativesMap activeChapterId={activeChapterId} chapters={chapters} />
      </div>

      {/* Panel scroller */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          height: "calc(100% - 100px)",
          width: "400px",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <NarrativesScroller
          chapters={chapters}
          index={index}
        />
      </div>
    </div>
  );
}
