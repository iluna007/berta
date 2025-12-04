import React from "react";
import { useNavigate } from "react-router-dom";

export default function ToolbarNavigateButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      style={{
        marginLeft: "1rem",
        padding: "0.5rem 1rem",
        background: "#222",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Volver a Narrativas visuales
    </button>
  );
}
