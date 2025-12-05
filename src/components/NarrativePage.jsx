// src/components/NarrativePage.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { hook_restore } from "../actions/hook_restore";

import NarrativesScroller from "./narratives/NarrativesScroller";
import NarrativesMap from "./narratives/NarrativesMap";
import NarrativeMedia from "./narratives/NarrativeMedia";
import SideMediaPanel from "./narratives/NarrativesSideMediaPanel";
import NarrativesNavigator from "./narratives/NarrativesNavigator";

import NarrativeTemplateCover from "./narratives/NarrativeTemplateCover";

const SCROLL_THRESHOLD = 200;

// ✅ ORDEN CANÓNICO DE TUS NARRATIVAS (según tu biblioteca izquierda)
const NARRATIVE_ORDER = ["00", "01", "02", "03", "04", "05", "06"];

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeNarrative, setActiveNarrative] = useState("01");
  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(null);

  const [showCover, setShowCover] = useState(true);

  const narrativePanelRef = useRef(null);
  const isPointerInsidePanel = useRef(false);

  // ⛔ Bloquear scroll global cuando el modal está abierto
  useEffect(() => {
    if (showCover) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCover]);

  // Cargar JSON dinámico de la narrativa activa
  useEffect(() => {
    fetch(`/narratives/narratives_${activeNarrative}.json`)
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.chapters || []);
        if (data.chapters?.length > 0) {
          setActiveChapterId(data.chapters[0].id);
          setIndex(0);
        }
      });
  }, [activeNarrative]);

  // ✅ Scroll narrativo solo dentro del panel
  useEffect(() => {
    if (!chapters.length || showCover) return;

    let accumulatedDelta = 0;

    const handler = (e) => {
      if (!isPointerInsidePanel.current) return;

      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (Math.abs(accumulatedDelta) < SCROLL_THRESHOLD) return;

      const direction = accumulatedDelta > 0 ? 1 : -1;
      accumulatedDelta = 0;

      moveIndex(direction);
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [chapters.length, showCover, activeNarrative]);

  useEffect(() => {
    if (chapters.length > 0) {
      setActiveChapterId(chapters[index]?.id);
    }
  }, [index, chapters]);

  const activeChapter = chapters.find((c) => c.id === activeChapterId);

  const goBack = async () => {
    await dispatch(hook_restore());
    navigate("/");
  };

  // ✅ FUNCIÓN UNIFICADA: scroll + botones + salto automático de narrativa
  const moveIndex = (direction) => {
    setIndex((prev) => {
      const next = prev + direction;

      // 🔁 CASO 1: salir por abajo → pasar a la siguiente narrativa
      if (next >= chapters.length) {
        const currentIdx = NARRATIVE_ORDER.indexOf(activeNarrative);
        const nextNarrative = NARRATIVE_ORDER[currentIdx + 1];

        if (nextNarrative) {
          setActiveNarrative(nextNarrative);
        }
        return prev; // se reseteará a 0 cuando cargue la nueva narrativa
      }

      // 🔁 CASO 2: salir por arriba → pasar a la narrativa anterior
      if (next < 0) {
        const currentIdx = NARRATIVE_ORDER.indexOf(activeNarrative);
        const prevNarrative = NARRATIVE_ORDER[currentIdx - 1];

        if (prevNarrative) {
          setActiveNarrative(prevNarrative);
        }
        return prev; // se reseteará cuando cargue
      }

      // ✅ Caso normal: cambiar solo de capítulo
      return next;
    });
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
      {/* MODAL DE PORTADA */}
      {showCover && (
        <NarrativeTemplateCover onClose={() => setShowCover(false)} />
      )}

      {/* Barra lateral de biblioteca */}
      <NarrativesNavigator
        onSelect={(id) => setActiveNarrative(id)}
        activeId={activeNarrative}
      />

      {/* Mapa */}
      <div
        style={{
          position: "absolute",
          left: "240px",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <NarrativesMap
          activeChapterId={activeChapterId}
          chapters={chapters}
        />
      </div>

      {/* Panel lateral de media */}
      <SideMediaPanel chapter={activeChapter} />

      {/* Panel narrativo */}
      <div
        ref={narrativePanelRef}
        className="left-narrative-panel narrative-scroll-zone"
        onMouseEnter={() => (isPointerInsidePanel.current = true)}
        onMouseLeave={() => (isPointerInsidePanel.current = false)}
        style={{
          position: "absolute",
          top: "40px",
          left: "260px",
          width: "380px",
          height: "calc(100% - 80px)",
          zIndex: 30,
          overflow: "hidden",
        }}
      >
        {/* Flecha arriba */}
        <div
          className="narrative-arrow arrow-up"
          onClick={() => moveIndex(-1)}
        >
          ↑
        </div>

        <NarrativesScroller chapters={chapters} index={index} />

        {!activeChapter?.sideMedia && (
          <div style={{ marginTop: "20px" }}>
            <NarrativeMedia chapter={activeChapter} />
          </div>
        )}

        {/* Flecha abajo */}
        <div
          className="narrative-arrow arrow-down"
          onClick={() => moveIndex(1)}
        >
          ↓
        </div>

        <div className="scroll-indicator">Scroll para avanzar</div>
      </div>
    </div>
  );
}
