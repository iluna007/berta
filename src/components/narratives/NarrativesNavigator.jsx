import { useNavigate } from "react-router-dom";
import "../../scss/narratives_NarrativesNavigator.scss";

export default function NarrativesNavigator({ onSelect, activeId }) {
  const navigate = useNavigate();

  const items = [
    {
      id: "00",
      title: "NR-0 Intro",
      img: "/narratives/media/intro1.jpeg"
    },
    {
      id: "01",
      title: "NR-1 El golpe de 2009 y la venta del territorio",
      img: "/narratives/Narrativa 1/1.1-1.jpeg"
    },
    {
      id: "02",
      title: "NR-2 La red financiera: capitales bancos empresarios y la familia Atala",
      img: "/narratives/media/extractivismo1.jpeg"
    },
    {
      id: "03",
      title: "NR-3 Compra de terrenos infraestructuras y logísticas de despojo",
      img: "/narratives/media/Gephisample2.jpeg"
    },
    {
      id: "04",
      title: "NR-4 Los agresores: Los agentes estatales de seguridad y la red criminal",
      img: "/narratives/media/violencia_redes.jpeg"
    },
    {
      id: "05",
      title: "NR-5 El asesinato de Berta Cáceres",
      img: "/narratives/media/infraestructura_conflicto.mp4"
    },
    {
      id: "06",
      title: "NR-6 El mecanismo generador de impunidad",
      img: "/narratives/media/Gephisample2.jpeg"
    }
  ];

  return (
    <div className="navigator-container">
      <button
        onClick={() => navigate("/plataforma")}
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
