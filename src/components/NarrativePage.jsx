// src/components/NarrativePage.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hook_restore } from "../actions/hook_restore";

import NarrativesScroller from "./narratives/NarrativesScroller";
import NarrativesMap from "./narratives/NarrativesMap";
import NarrativeMedia from "./narratives/NarrativeMedia";
import SideMediaPanel from "./narratives/SideMediaPanel";

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(null);

  // ------------------------------
  // CARGAR JSON
  // ------------------------------
  useEffect(() => {
    fetch("/narratives/narratives.json")
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.chapters);
        setActiveChapterId(data.chapters[0].id);
      });
  }, []);

  // ------------------------------
  // SCROLL GLOBAL
  // ------------------------------
  useEffect(() => {
    if (!chapters.length) return;

    const handler = (e) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        setIndex((i) => Math.min(i + 1, chapters.length - 1));
      } else {
        setIndex((i) => Math.max(i - 1, 0));
      }
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [chapters.length]);

  // ------------------------------
  // CAMBIO DE CAPÍTULO
  // ------------------------------
  useEffect(() => {
    if (chapters.length > 0) {
      setActiveChapterId(chapters[index].id);
    }
  }, [index, chapters]);

  const activeChapter = chapters.find((c) => c.id === activeChapterId);

  const goBack = async () => {
    await dispatch(hook_restore());
    navigate("/");
  };

  // ------------------------------
  // RENDER
  // ------------------------------
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
      {/* BOTÓN VOLVER */}
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 50,
          background: "#333",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← BACK TO PLATFORM
      </button>

      {/* MAPA */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <NarrativesMap activeChapterId={activeChapterId} chapters={chapters} />
      </div>

      {/* PANEL DERECHO SOLO PARA sideMedia */}
      {activeChapter?.sideMedia && (
        <SideMediaPanel chapter={activeChapter} />
      )}

      {/* PANEL IZQUIERDO */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          width: "400px",
          height: "calc(100% - 100px)",
          zIndex: 30,
          overflow: "visible",
          pointerEvents: "auto"
        }}
      >
        <NarrativesScroller chapters={chapters} index={index} />

        {!activeChapter?.sideMedia && (
          <div style={{ marginTop: "20px" }}>
            <NarrativeMedia media={activeChapter?.media} />
          </div>
        )}
      </div>

    </div>
  );
}
