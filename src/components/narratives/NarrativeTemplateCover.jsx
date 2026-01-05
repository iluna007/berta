import { useState } from "react";
import { Player } from "video-react";
import { marked } from "marked";
import "../../scss/NarrativeTemplateCover.scss";
import bcatlogo from "../../assets/HORIZONTAL_NEGATIVO.svg";
import copinh from "../../assets/copinh.png";
import giei from "../../assets/GIEI.png";
import cejilogo from "../../assets/cejil.png";

const MEDIA_HIDDEN = -1;

export default function NarrativeTemplateCover({ onClose }) {
  const [videoIndex, setVideoIndex] = useState(MEDIA_HIDDEN);

  const data = {
    title:
      "GRUPO INTERDISCIPLINARIO DE EXPERTOS INDEPENDIENTES EN EL CASO DE BERTA CÁCERES",
    subtitle: "",
    subsubtitle: "",
    exploreButton: "PLATAFORMA",
    narrativeButton: "NARRATIVAS",

    description: [
      // PÁRRAFO 1
      "Esta plataforma web interactiva ha sido desarrollada en el marco del mandato del Grupo Interdisciplinario de Expertas y Expertos Independientes (GIEI) para Honduras, cuyo mandato es esclarecer hechos de violencia, identificar patrones de impunidad y contribuir a la memoria, la verdad, justicia y reparación en el caso del asesinato de la líder y defensora lenca, Berta Cáceres Flores, el 3 de marzo de 2016. La documentación aquí presentada aporta insumos técnicos y contextuales que complementan los esfuerzos de esclarecimiento y dignificación de las víctimas.",

      // 👇 IMAGEN ENTRE P1 Y P2
      { type: "image", src: "/narratives/media/Berta1.jpg", alt: "foto: Justice for Berta" },

      // PÁRRAFO 2
      "#### Alcance de la investigación",

      // PÁRRAFO 3
      "Esta plataforma interactiva documenta incidentes, evidencias y contextos relacionados con el caso del asesinato de Berta Cáceres Flores y el entramado de actores, infraestructuras y decisiones empresariales que lo rodearon. La plataforma facilitar el análisis de episodios que evidencian posibles daños a civiles, afectaciones a comunidades, territorios y agrupaciones de defensa, principalmente el Consejo Cívico de Organizaciones Populares e Indígenas de Honduras (COPINH), como consecuencia del proyecto de la represa Agua Zarca que se materializó a través de la construcción de infraestructuras, patrones de control territorial y cooptación y fragmentación de las comunidades indígenas. Estos incidentes de violencia no fueron casos aislados sino parte de una lógica empresarial en la que estuvieron involucrados corporativos, agentes estatales de seguridad, instituciones del estado hondureño, y criminales sentenciados. La plataforma no pretende ser exhaustiva, sino un muestrario de narrativas y evidencias cuya localización y contexto han sido suficientemente corroborados para su publicación.",

      // 👇 VIDEO ENTRE PÁRRAFO 3 Y 4
      //{ type: "video", src: "/narratives/media/infraestructura_conflicto.mp4" },

      // PÁRRAFO 4
     "#### LA PLATAFORMA COMO MEDIO DE INVESTIGACIÓN",
      "Esta plataforma en su versión 1.0 busca volver visibles posibles interacciones y relaciones entre actores y eventos. Al reunir cientos de entradas se convierte en Siguiendo las enseñanzas de Berta y COPINH, esta plataforma ha sido concebida como el inicio de una plataforma colectiva a la cual pueden contribuir colectivos, defensores, investigadores, activistas y público en general.",
      
    "#### FUENTES",
      "Los insumos de la investigación provienen principalmente de evidencia forense y documentación judicial obtenida durante el proceso penal del caso Berta Cáceres: registros telefónicos y extracciones de dispositivos de los imputados, más de 400,000 chats de WhatsApp, transacciones financieras y correos electrónicos de bancos internacionales, títulos de propiedad y escrituras de compra de terrenos, censos de la comunidad Río Blanco, expedientes judiciales (sentencias y declaraciones), y estudios técnicos sobre el proyecto hidroeléctrico. Esta información ha sido complementada con materiales de acceso público cuando su divulgación no compromete a personas o procesos en curso. Cuando el material proviene de fuentes abiertas, se mantiene el enlace original y se resguarda una copia para preservación. La presencia de un enlace no implica afiliación entre quienes publicaron el contenido y este proyecto.",
  
    "#### NIVELES DE VERIFICACIÓN",
      "Cada registro documentado en esta plataforma pasa por controles de verificación que incluyen: autenticidad de la fuente, coherencia temporal, geolocalización mediante referencias cruzadas con mapas satelitales y cartografía oficial, y triangulación con múltiples fuentes cuando están disponibles. Los puntos del mapa, trayectorias y ubicaciones que se muestran públicamente han alcanzado un nivel de certeza espacial suficiente para su publicación; casos con localización incierta o que requieren protección adicional se resguardan para análisis interno del GIEI. La verificación forense avanzada para uso probatorio en procesos judiciales requiere peritajes especializados y se desarrolla en el marco del mandato oficial del GIEI, surgido de un acuerdo entre el gobierno hondureño y la Organización de los Estados Americanos (OEA).",
  
    "#### DESCRIPCIONES Y LÍMITES",
      "Las fichas describen lo que es claramente visible o documentalmente sustentable: qué, cuándo, dónde y con qué afectaciones plausibles. No se infieren números precisos de víctimas ni se atribuye responsabilidad a una parte sin evidencia suficiente y trazable. Los campos narrativos priorizan la claridad, señalan incertidumbres y distinguen entre observación, inferencia y contexto. Los límites geográficos de los incidentes se representan con la mayor precisión posible según la evidencia disponible, pero no pretenden ser exhaustivos ni definitivos. La representación espacial busca equilibrar precisión y respeto por la privacidad y seguridad de las comunidades afectadas",
    
    "#### FILTROS Y NAVEGACIÓN",
      "En el panel lateral puedes activar eventos por distintas categorías, seleccionar un periodo temporal, y activar capas geográficas y analíticas. Entre otros:",
      "-Tipos de eventos: agresiones, concesiones, comunicaciones, transacciones, acciones de defensa del territorio.",
      "-Actores involucrados: bancos y fondos internacionales, ejecutivos y personal de empresas o de seguridad privada, autoridades militares y policiales, actores de redes criminales, miembros del COPINH y comunidades afectadas.",
      "-Capas territoriales: comunidades lencas afectadas (La Tejera, El Barreal, Río Blanco, La Vega), predios adquiridos por DESA, ubicaciones del proyecto hidroeléctrico (versiones de 2009 y 2013), infraestructuras relacionadas.",
      "Las clasificaciones se basan en evidencia documental proveniente de expedientes judiciales, testimonios y registros oficiales; cada evento está vinculado a sus fuentes primarias para garantizar trazabilidad y verificabilidad.",
    
    "#### PRIVACIDAD, SEGURIDAD Y RESPETO",
      "El material puede ser sensible o perturbador. Se aplican medidas de minimización de daño: difuminado o recorte cuando hay riesgo de identificación de personas en situación de vulnerabilidad; exclusión de imágenes de cuerpos que permitan identidad directa; desajuste deliberado de coordenadas públicas en rangos prudentes cuando la revelación precisa implique riesgo. Se retiran datos personales no esenciales y se atienden solicitudes fundadas de retiro o mayor resguardo.",

    "#### CRÉDITOS",
      "Esta investigación, plataforma y videos fue desarrollada por el equipo de re/presentare en colaboración con el GIEI de Honduras para el caso del asesinato de Berta Cáceres. La plataforma utiliza código abierto desarrollado por Forensic Architecture y Bellingcat."
    ],


    headerVideos: [],
    videos: [],
    featureVideo: null,
    bgVideo: null,
  };

 return (
    <div
      className="ntc-overlay"
      onWheel={(e) => e.stopPropagation()}
      onScroll={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="ntc-container">
        {/* ✕ superior izquierda */}
        <div className="ntc-close-top">
          <div className="ntc-close" onClick={onClose}>✕</div>
        </div>

        {/* Logos superiores */}
        <div className="ntc-header-logos">
          <a
            href="https://www.gieihonduras.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="ntc-logo1" src={giei} alt="Logo GIEI" />
          </a>
        </div>

        {/* Título centrado */}
        <h2
          className="ntc-title"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        {/* Contenido */}
        {data.description.map((block, i) => {
          if (typeof block === "string") {
            return (
              <div
                key={i}
                className="ntc-md"
                dangerouslySetInnerHTML={{ __html: marked(block) }}
              />
            );
          }

          if (block.type === "image") {
            return (
              <div key={i} className="ntc-img-block">
                <img src={block.src} alt={block.alt || "image"} />
              </div>
            );
          }

          if (block.type === "video") {
            return (
              <div key={i} className="ntc-video-block">
                <video controls className="ntc-inline-video">
                  <source src={block.src} type="video/mp4" />
                </video>
              </div>
            );
          }

          return null;
        })}

        {/* Logos inferiores */}
        <div className="ntc-footer-logos">
          <a href="https://copinh.org" target="_blank" rel="noopener noreferrer">
            <img className="ntc-logo2" src={copinh} alt="Logo COPINH" />
          </a>

          <a
            href="http://www.re-presentare.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="ntc-logo2" src={bcatlogo} alt="Logo re-presentare" />
          </a>

          <a href="https://cejil.org/" target="_blank" rel="noopener noreferrer">
            <img className="ntc-logo2" src={cejilogo} alt="Logo CEJIL" />
          </a>
        </div>

        {/* ✕ inferior derecha */}
          <div className="ntc-close-bottom">
            <div className="ntc-close" onClick={onClose}>✕</div>
          </div>
      </div>
    </div>
  );
}