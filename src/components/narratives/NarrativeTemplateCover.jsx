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
      "Esta plataforma web interactiva ha sido desarrollada en el marco del mandato del Grupo Interdisciplinario de Expertas y Expertos Independientes (GIEI) para Honduras, cuyo encargo es esclarecer hechos de violencia, identificar patrones de impunidad y contribuir a la memoria, la verdad, justicia y reparación en el caso del asesinato de la líder y defensora lenca, Berta Cáceres Flores, el 2 de marzo de 2016. La documentación aquí presentada aporta insumos técnicos y contextuales que complementan los esfuerzos de esclarecimiento y dignificación de las víctimas.",

      // 👇 IMAGEN ENTRE P1 Y P2
      { type: "image", src: "/narratives/media/Berta1.jpg", alt: "foto: Justice for Berta" },

      // PÁRRAFO 2
      "#### Alcance de la investigación",

      // PÁRRAFO 3
      "Esta plataforma interactiva documenta incidentes, evidencias y contextos relacionados con el caso del asesinato de Berta Cáceres Flores y el entramado de actores, infraestructuras y decisiones empresariales que lo rodearon. La plataforma facilita el análisis de episodios que evidencian daños a civiles, afectaciones a comunidades, territorios y agrupaciones de defensa, principalmente el Consejo Cívico de Organizaciones Populares e Indígenas de Honduras (COPINH), como consecuencia del Proyecto Hidroeléctrico Agua Zarca (PHAZ) que se materializó a través de la construcción de infraestructuras, patrones de control territorial y cooptación y fragmentación de las comunidades indígenas. Estos incidentes de violencia no fueron casos aislados, sino parte de una lógica empresarial en la que estuvieron involucrados corporativos, agentes estatales de seguridad, instituciones del estado hondureño, y criminales sentenciados. La plataforma no pretende ser exhaustiva, sino un muestrario de narrativas y evidencias cuya localización y contexto han sido suficientemente corroborados para su publicación.",


      // PÁRRAFO 2
      "#### Alcance de la investigación",
      // 👇 VIDEO ENTRE PÁRRAFO 3 Y 4
      {
        type: "vimeo",
        src: "https://player.vimeo.com/video/1153048012?autopause=0",
        title: "El asesinato de Berta Isabel Cáceres Flores"
      },

      // PÁRRAFO 4
     "#### LA PLATAFORMA COMO MEDIO DE INVESTIGACIÓN",
      "Esta plataforma, en su versión 1.0, busca volver visibles posibles interacciones y relaciones entre actores y eventos. Al reunir miles de entradas de datos se convierte en una herramienta investigativa que abre la posibilidad de nuevas investigaciones a sus usuarios.",

      "Siguiendo las enseñanzas de Berta y COPINH, esta plataforma ha sido concebida como el inicio de un esfuerzo colectivo a la cual pueden contribuir colectivos, defensores, investigadores, activistas y público en general. Debido a la restricción en tiempo, que se ajusta al mandato del GIEI, lo que mostramos aquí es el resultado de ese primer esfuerzo por registrar, esclarecer y dar sentido a la compleja y vasta investigación realizada por los miembros de este grupo. Invitamos así a los usuarios a contribuir a su enriquecimiento por medio de nuestro contacto info@re-presentare.org",
      
      "Aprende mas sobre la plataforma aquí.",

    "#### FUENTES",
      "Los insumos de la investigación provienen principalmente de evidencia forense y documentación judicial obtenida durante el proceso penal del caso Berta Cáceres: registros telefónicos y extracciones de dispositivos de los imputados, más de 400,000 chats de WhatsApp, transacciones financieras y correos electrónicos de bancos internacionales, títulos de propiedad y escrituras de compra de terrenos, censos de la comunidad Río Blanco, expedientes judiciales (sentencias y declaraciones), y estudios técnicos sobre el proyecto hidroeléctrico. Esta información ha sido complementada con materiales de acceso público cuando su divulgación no compromete a personas o procesos en curso. Cuando el material proviene de fuentes abiertas, se mantiene el enlace original y se resguarda una copia para preservación. La presencia de un enlace no implica afiliación entre quienes publicaron el contenido y este proyecto.",
  
    "#### NIVELES DE VERIFICACIÓN",
      "Cada registro documentado en esta plataforma pasa por controles de verificación que incluyen: autenticidad de la fuente, coherencia temporal, geolocalización mediante referencias cruzadas con mapas satelitales y cartografía oficial, y triangulación con múltiples fuentes cuando están disponibles. Los puntos del mapa, trayectorias y ubicaciones que se muestran públicamente han alcanzado un nivel de certeza espacial suficiente para su publicación; casos con localización incierta o que requieren protección adicional se resguardan para análisis interno del GIEI. La verificación forense avanzada para uso probatorio en procesos judiciales requiere peritajes especializados y se desarrolla en el marco del mandato oficial del GIEI, surgido de un acuerdo entre el gobierno hondureño y la Organización de los Estados Americanos (OEA).",
  
    "#### PRIVACIDAD, SEGURIDAD Y RESPETO",
      "El material puede ser sensible o perturbador. Se aplican medidas de minimización de daño: difuminado o recorte cuando hay riesgo de identificación de personas en situación de vulnerabilidad; exclusión de nombres o imágenes de cuerpos que permitan identidad directa; desajuste deliberado de coordenadas públicas en rangos prudentes cuando la revelación precisa implique riesgo. Se retiran datos personales no esenciales y se atienden solicitudes fundadas de retiro o mayor resguardo.",
    

    "#### CRÉDITOS",
     "La plataforma utiliza código abierto desarrollado por nuestros aliados en [Forensic Architecture](https://forensic-architecture.org/) y [Bellingcat](https://www.bellingcat.com/).",
  
    "#### Miembros del GIEI-Honduras:",
      "Roxanna Altholz, experta en derecho internacional de los derechos humanos.",
      "Pedro Biscay, experto en análisis financiero y criminalidad económica.",
      "Ricardo Guzmán, experto en derecho penal y ciencias forenses.",

    "#### Colaboradores del GIEI-Honduras:",
      "Aníbal Argüello - analista criminal especializado en minería de datos y macrocriminalidad.",
      "Vincenzo Caruso - economista y analista principal de transacciones y finanzas.",
      "Julián Corti - abogado especializado en derecho penal e investigación de delitos complejos.",
      "Omar Gómez Trejo - abogado especializado en investigaciones criminales y de derechos humanos.",
      "Helen Kerwin - abogada especializada en derecho internacional de los derechos humanos.",
      "Fernando Vallone - abogado especializado en análisis e investigación de corrupción y criminalidad organizada.",

    
    "#### re/presentare",
      "Sergio Beltrán-García",
      "Elis Mendoza",
      "Fernanda Gómez Seoane",
      "Emiliano Farfán Gómez",
      "Iker Luna",
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
          <div className="ntc-close" onClick={onClose}>
            ✕
          </div>
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

        {/* Título */}
        <h2
          className="ntc-title"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        {/* CONTENIDO */}
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

          // 🔥 VIMEO
          if (block.type === "vimeo") {
            return (
              <div
                key={i}
                className="ntc-video-block"
                style={{ position: "relative", paddingTop: "56.25%" }}
              >
                <iframe
                  src={block.src}
                  title={block.title || "Vimeo video"}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
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
          <div className="ntc-close" onClick={onClose}>
            ✕
          </div>
        </div>
      </div>
    </div>
  );
}