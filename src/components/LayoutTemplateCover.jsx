import { useState } from "react";
import { Player } from "video-react";
import { marked } from "marked";
import "../scss/LayoutTemplateCover.scss";


const MEDIA_HIDDEN = -1;

export default function LayoutTemplateCover({ onClose }) {
  const [videoIndex, setVideoIndex] = useState(MEDIA_HIDDEN);

  const data = {
    title:
      "COMO UTILIZAR LA PLATAFORMA CARTOGRÁFICA",
    subtitle: "",
    subsubtitle: "",
    exploreButton: "PLATAFORMA",
    narrativeButton: "NARRATIVAS",

    description: [
      // PÁRRAFO 1
      "Esta plataforma cartográfica es una herramienta investigativa legible e interactiva para el público general. Permite visualizar y cruzar información de miles de eventos documentados tanto en la investigación del GIEI para el caso de Berta Cáceres, así como en el análisis territorial conducido por re/presentare para visibilizar espacial y temporalmente coincidencias, patrones y estructuras de operación.",
      "La plataforma cartográfica esta organizada a través de capas, que organizan y visualizan  información en extensiones de territorios; datos, que contienen categorías de eventos como son comunicaciones, daños, infraestructuras, y transacciones. Cada punto de dato tiene una ubicación espacial y temporal, que en la línea de tiempo permite comprender la evolución de eventos.",
      // 👇 IMAGEN ENTRE P1 Y P2
      { type: "image", src: "/images/tutorial1.jpg", alt: "foto: t1" },

      // PÁRRAFO 2
      "#### DATOS",
      "En la línea del tiempo se puede escoger ver 'todos los eventos' (2009-2024) o solo eventos en un espacio temporal, haciendo clic en el 'zoom de un año' hasta 'zoom de un día'. Las flechas a los costados de la línea de tiempo permite retroceder o avanzar en el tiempo, y la ventana temporal elegida filtra los datos que se expresan espacialmente. Cuando la plataforma cartográfica carga por primera vez, todos los datos se visibilizan como puntos blancos.",
      { type: "image", src: "/images/tutorial2.jpg", alt: "foto: t2" },

      "Por ejemplo, podemos seleccionar en datos todos los eventos de daños a todos los colectivos de movimientos sociales (verde) y los asesinatos de defensores de territorio (rojo). Es importante señalar que los colores no son estáticos ni absolutos, sino que cambian de color de acuerdo al orden en que se seleccionan, para así facilitar comparaciones entre datos.",
      { type: "image", src: "/images/tutorial3.jpg", alt: "foto: t3" },

      "Cuando un dato está seleccionado, aparecerá un círculo punteado en el mapa y linea de tiempo para distinguir su ubicación espacio-temporal. Al seleccionar uno de los puntos de datos en el mapa o la línea de tiempo, un cuadro de información aparecerá del lado derecho, que brinda mayor riqueza de información que contextualiza el punto de dato.",
      { type: "image", src: "/images/tutorial4.jpg", alt: "foto: t4" },

      "#### CAPAS",
      "Las capas brindan información contextual y en extensión de territorio. De esta manera nos brindan información adicional para ubicar un dato dentro de una zona, infraestructura, fenómeno, clasificación o grupo.",
      "Las capas son estáticas y, a diferencia de los datos, no viene acompañadas de un recuadro de información ya que no corresponden a un evento en el tiempo preciso.",

      { type: "image", src: "/images/tutorial5.jpg", alt: "foto: t5" },
      
      "Se pueden combinar datos y capas para cruzar información y empezar a distinguir patrones. En este ejemplo se cruzan los datos de 'hidroeléctricas' con 'asesinatos de defensores' y 'daños a los movimientos sociales', sobre estos se seleccionan las capas de 'presencias territoriales'.  Este cruce de información nos permite tener un primer acercamiento al control territorial que se ha ejercido sobre territorios de personas indígenas y/o afrodescendientes.",

      { type: "image", src: "/images/tutorial6.jpg", alt: "foto: t6" },

      "De la misma manera podríamos seleccionar la huella de construcción del proyecto Agua Zarca en sus dos fases y los ataques a miembros del COPINH o las comunicaciones en un dia en particular, por ejemplo de la toma de El Roble, o el día del asesinato de Berta.",
      "Te invitamos a utilizar la plataforma y experimentar con filtros, datos y la información en los cuadros.",  

      "#### INFORMACIÓN ADICIONAL",

      "#### FILTROS Y NAVEGACIÓN",

      "En el panel lateral puedes activar eventos por distintas categorías, seleccionar un periodo temporal, y activar capas geográficas y analíticas. Entre otros:",
      "-Tipos de eventos: agresiones, concesiones, comunicaciones, transacciones, acciones de defensa del territorio.",
      "-Capas territoriales: comunidades lencas afectadas (La Tejera, El Barreal, Río Blanco, La Vega), predios adquiridos por DESA, ubicaciones del proyecto hidroeléctrico (versiones de 2009 y 2013), infraestructuras relacionadas.",
      "Las clasificaciones se basan en evidencia documental proveniente de expedientes judiciales, testimonios y registros oficiales; cada evento está vinculado a sus fuentes primarias para garantizar trazabilidad y verificabilidad.",
     
      "#### DESCRIPCIONES Y LÍMITES",

      "Las fichas describen lo que es claramente visible o documentalmente sustentable: qué, cuándo, dónde y con qué afectaciones plausibles. No se infieren números precisos de víctimas ni se atribuye responsabilidad a una parte sin evidencia suficiente y trazable. Los campos narrativos priorizan la claridad, señalan incertidumbres y distinguen entre observación, inferencia y contexto. Los límites geográficos de los incidentes se representan con la mayor precisión posible según la evidencia disponible, pero no pretenden ser exhaustivos ni definitivos. La representación espacial busca equilibrar precisión y respeto por la privacidad y seguridad de las comunidades afectadas. Las descripciones de los eventos se mantienen fiel a su fuente, por eso algunos se encuentran narrados en primera persona, otros en tercera y otros en inglés.",
      
      "#### NOTAS METODOLÓGICAS",

      "La plataforma cartográfica esta diseñada para verse  en computadoras de escritorio (no en dispositivos móviles) al 100% de zoom de la pantalla, es importante que la ventana de navegación este maximizada para que no se corte el texto.",
      "Las ubicaciones de llamadas, las huellas de presencia de personas y otras localizaciones obedecen a la posición de las antenas de teléfono celular, no son exactas.",
      "Las ubicaciones de transacciones corresponden a la ubicación de la entidad emisora del pago.",
      "Las ubicaciones de los eventos de daños se obtuvieron a partir de las descripciones de cada punto de dato, geolocalizadas con información de fuente abierta. Provienen de distintas fuentes, lo que explica diferencias en tono e idioma en sus descripciones.",
      "Las fechas asociadas a datos de las hidroeléctricas se basaron el las fechas de cada uno de los contratos. Debido a las restricciones de tiempo y mandato no pudimos profundizar en la investigación para corroborar fechas que corresponden a etapas de desarrollos, por lo tanto son puramente ilustrativas."


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

        
      </div>
    </div>
  );
}