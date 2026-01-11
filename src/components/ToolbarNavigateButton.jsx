import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToolbarNavigateButton() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={() => navigate("/")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginLeft: "1rem",
        padding: "0.5rem 2rem",
        background: hover ? "#222" : "#2ecc71",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: "4px",
        cursor: "pointer",
        transform: hover ? "scale(1.1)" : "scale(1)",
        transition: "background-color 0.25s ease, transform 0.2s ease",
      }}
    >
      Volver a Narrativas visuales
    </button>
  );
}
