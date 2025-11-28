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

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 narrativa activa (pero sin lógica por ahora)
  const [activeNarrative, setActiveNarrative] = useState("01");

  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(null);

  // Cargar JSON cuando activeNarrative cambie (esto se activará en PASO 2)
  useEffect(() => {
    fetch(`/narratives/narratives_${activeNarrative}.json`)
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.chapters || []);
        if (data.chapters?.length > 0) {
          setActiveChapterId(data.chapters[0].id);
        }
      });
  }, [activeNarrative]);

  // Scroll
  useEffect(() => {
    if (!chapters.length) return;

    const handler = (e) => {
      e.preventDefault();
      setIndex((i) =>
        e.deltaY > 0
          ? Math.min(i + 1, chapters.length - 1)
          : Math.max(i - 1, 0)
      );
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [chapters.length]);

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
        background: "#000"
      }}
    >
         
      {/* 🔥 Barra lateral fija */}
      <NarrativesNavigator onSelect={(id) => setActiveNarrative(id)} />

      {/* Mapa */}
      <div
        style={{
          position: "absolute",
          left: "240px",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1
        }}
      >
        <NarrativesMap activeChapterId={activeChapterId} chapters={chapters} />
      </div>

      {/* Panel de media lateral */}
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
          overflow: "hidden"
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
