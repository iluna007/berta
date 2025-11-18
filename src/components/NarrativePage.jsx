import NarrativeScroller from "./narratives/NarrativesScroller";
import NarrativesMap from "./narratives/NarrativesMap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hook_restore } from "../actions/hook_restore";

export default function NarrativePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeChapterId, setActiveChapterId] = useState(null);

  // Inicializamos el objeto global
  window.__NARRATIVES__ = [];

  const goBack = async () => {
    await dispatch(hook_restore());
    navigate("/");
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <button
        onClick={goBack}
        style={{
          padding: "10px 20px",
          margin: "20px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← BACK TO PLATFORM
      </button>

      <div style={{ display: "flex", flex: 1 }}>
        
        {/* PANEL IZQUIERDO — EL SCROLLER */}
        <div style={{ width: "35%", height: "100%" }}>
          <NarrativeScroller onChapterChange={setActiveChapterId} />
        </div>

        {/* PANEL DERECHO — EL MAPA */}
        <div style={{ flex: 1 }}>
          <NarrativesMap activeChapterId={activeChapterId} />
        </div>

      </div>
    </div>
  );
}
