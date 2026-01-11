import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/narratives_NarrativesNavigator.scss";

export default function NarrativesNavigator({ onSelect, activeId }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const items = [
    {
      id: "00",
      title: "0-Intro",
      img: "/narratives/media/0.0 portada.jpeg"
    },
    {
      id: "01",
      title: "1-El golpe de 2009 y la venta del territorio",
      img: "/narratives/media/1.0 portada.jpeg"
    },
    {
      id: "02",
      title: "2-La red financiera: capitales bancos empresarios y la familia Atala",
      img: "/narratives/media/2.0 portada.jpeg"
    },
    {
      id: "03",
      title: "3-Compra de terrenos infraestructuras y logísticas de despojo",
      img: "/narratives/media/3.0 portada.jpg"
    },
    {
      id: "04",
      title: "4-El dispositivo coercitivo",
      img: "/narratives/media/4.0 portada.jpg"
    },
    {
      id: "05",
      title: "5-El asesinato de Berta Cáceres",
      img: "/narratives/media/5.0 portada.jpg"
    },
    {
      id: "06",
      title: "6-El mecanismo generador de impunidad",
      img: "/narratives/media/6.0 portada.jpg"
    }
  ];

  return (
    <div className="navigator-container">
      <button
        onClick={() => navigate("/plataforma")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          marginBottom: "20px",
          background: hover ? "#222" : "#2ecc71",
          color: "white",
          padding: "10px 16px",
          border: "1px solid #444",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          textAlign: "left",
          transform: hover ? "scale(1.1)" : "scale(1)",
          transition: "background-color 0.25s ease, transform 0.2s ease"
        }}
      >
        ← Plataforma
      </button>

      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`navigator-item ${activeId === item.id ? "active" : ""}`}
        >
          <img src={item.img} alt={item.title} />
          <div className="title">{item.title}</div>
        </div>
      ))}
    </div>
  );
}
