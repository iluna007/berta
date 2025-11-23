// src/components/NarrativePage.jsx

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hook_restore } from "../actions/hook_restore";

import NarrativesScroller from "./narratives/NarrativesScroller";
import NarrativesMap from "./narratives/NarrativesMap";
import NarrativeMedia from "./narratives/NarrativeMedia";
import SideMediaPanel from "./narratives/NarrativesSideMediaPanel";

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(null);

  // ------------------------------
  // Load JSON
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
  // Scroll navigation
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
  // Update active chapter
  // ------------------------------
  useEffect(() => {
    if (chapters.length > 0) {
      setActiveChapterId(chapters[index].id);
    }
  }, [index, chapters]);

  const activeChapter = chapters.find((c) => c.id === activeChapterId);

  // ------------------------------
  // Back button
  // ------------------------------
  const goBack = async () => {
    await dispatch(hook_restore());
    navigate("/");
  };

  // ------------------------------
  // Render
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
      {/* Back button */}
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 50,
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

      {/* MAP */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <NarrativesMap activeChapterId={activeChapterId} chapters={chapters} />
      </div>

      {/* RIGHT PANEL (side media only) */}
      <SideMediaPanel chapter={activeChapter} />

      {/* LEFT PANEL */}
      <div
        className="left-narrative-panel"
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          width: "400px",
          height: "calc(100% - 100px)",
          zIndex: 30,
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        <NarrativesScroller chapters={chapters} index={index} />

        {/* Normal media (only when NOT sideMedia) */}
        {!activeChapter?.sideMedia && (
          <div style={{ marginTop: "20px" }}>
            <NarrativeMedia media={activeChapter?.media} />
          </div>
        )}

        {/* Scroll visual hint */}
        <div className="left-panel-scroll-hint">
          <span>scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </div>
  );
}
