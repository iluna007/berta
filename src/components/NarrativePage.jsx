// src/components/NarrativePage.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hook_restore } from "../actions/hook_restore";

import NarrativesScroller from "./narratives/NarrativesScroller";
import NarrativesMap from "./narratives/NarrativesMap";
import NarrativeMedia from "./narratives/NarrativeMedia";
import SideMediaPanel from "./narratives/NarrativesSideMediaPanel";
import NarrativesNavigator from "./narratives/NarrativesNavigator";

import NarrativeTemplateCover from "./narratives/NarrativeTemplateCover";

const SCROLL_THRESHOLD = 200;

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeNarrative, setActiveNarrative] = useState("01");
  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(null);

  // 👇 NUEVO
  const [showCover, setShowCover] = useState(true);

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

  // Cargar JSON dinámico
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

  // Scroll narrativo
  useEffect(() => {
    if (!chapters.length || showCover) return;

    let accumulatedDelta = 0;

    const handler = (e) => {
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (Math.abs(accumulatedDelta) < SCROLL_THRESHOLD) return;

      const direction = accumulatedDelta > 0 ? 1 : -1;
      accumulatedDelta = 0;

      setIndex((i) =>
        direction > 0
          ? Math.min(i + 1, chapters.length - 1)
          : Math.max(i - 1, 0)
      );
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [chapters.length, showCover]);

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

      {/* Barra lateral */}
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
        <NarrativesMap activeChapterId={activeChapterId} chapters={chapters} />
      </div>

      {/* Panel lateral de media */}
      <SideMediaPanel chapter={activeChapter} />

      {/* Panel narrativo */}
      <div
        className="left-narrative-panel"
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
        <NarrativesScroller chapters={chapters} index={index} />

        {!activeChapter?.sideMedia && (
          <div style={{ marginTop: "20px" }}>
            <NarrativeMedia chapter={activeChapter} />
          </div>
        )}
      </div>
    </div>
  );
}
