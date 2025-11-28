// src/components/narratives/NarrativesNavigator.jsx
import { useNavigate } from "react-router-dom";

export default function NarrativesNavigator({ onSelect }) {
  const navigate = useNavigate();

  const items = [
    {
      id: "01",
      title: "LALO LANDA",
      img: "/narratives/media/intro1.jpeg"
    },
    {
      id: "02",
      title: "WAKANDA FOREVER ✊🏾 ",
      img: "/narratives/media/extractivismo1.jpeg"
    },
    {
      id: "03",
      title: "Red financiera y empresarial",
      img: "/narratives/media/Gephisample2.jpeg"
    },
    {
      id: "04",
      title: "Infraestructuras y logística del despojo",
      img: "/narratives/media/violencia_redes.jpeg"
    },
    {
      id: "05",
      title: "Agresores y red criminal",
      img: "/narratives/media/infraestructura_conflicto.mp4"
    },
    {
      id: "06",
      title: "Impunidad y resistencia",
      img: "/narratives/media/Gephisample2.jpeg"
    }
  ];

  return (
    <div
      style={{
        width: "240px",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#111",
        padding: "20px",
        overflowY: "auto",
        zIndex: 9999
      }}
    >
      {/* 🔙 Botón Volver */}
      <button
        onClick={() => navigate("/")}
        style={{
          width: "100%",
          marginBottom: "20px",
          background: "#222",
          color: "white",
          padding: "10px 16px",
          border: "1px solid #444",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          textAlign: "left"
        }}
      >
        ← Volver al inicio
      </button>


      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          style={{
            cursor: "pointer",
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "6px",
            background: "#1a1a1a"
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            style={{
              width: "100%",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
              marginBottom: "8px"
            }}
          />
          <div style={{ color: "white", fontSize: "14px" }}>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}
