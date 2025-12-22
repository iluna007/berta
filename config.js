const one_day = 1440;

const config = {
  title: "Berta",
  display_title: "Berta Cáceres",
  SERVER_ROOT: "",
  EVENTS_EXT: "/data/events.json",
  SOURCES_EXT: "/data/sources.json",
  ASSOCIATIONS_EXT: "/data/associations.json",
  NARRATIVE_EXT: "narratives/narratives.json",
  API_DATA: "",
  MAPBOX_TOKEN:
  "pk.eyJ1IjoiaWtlcmx1bmEiLCJhIjoiY203NjMwZHptMHAzaDJrcXlrbnNuMHJlZiJ9.hkoRlM6gQ-BflcGjpI40GA",
  


  DATE_FMT: "M/D/YYYY",
  TIME_FMT: "HH:mm",

  store: {
    app: {
      debug: true,
      map: {
        anchor: [14.8, -86.6],
        maxZoom: 18,
        minZoom: 4,
        startZoom: 8,
      },
      cluster: { radius: 50, minZoom: 5, maxZoom: 12 },
      associations: {
        defaultCategory: "Tipo de daño",
      },
      timeline: {
        dimensions: {
          height: 90,
          contentHeight: 90,
        },
        zoomLevels: [
          { label: "Zoom de 1 año", duration: 12 * 31 * one_day },
          { label: "Zoom de 2 años", duration: 48 * 31 * one_day },
          { label: "Zoom de 4 años", duration: 72 * 31 * one_day },
          { label: "Zoom de 8 años", duration: 96 * 31 * one_day },
          { label: "Zoom de 10 años", duration: 120 * 31 * one_day },
          { label: "Zoom de 12 años", duration: 144 * 31 * one_day },
          { label: "Zoom de 14 años", duration: 168 * 31 * one_day },
          
        ],
        range: {
          // ✅ Define el rango de fechas visible al iniciar
          initial: ["2010-01-01T00:00:00.000Z", "2025-12-31T23:59:59.000Z"],
          initialDaysShown: 31 * 12,
          limits: {
            lower: "2010-01-01T00:00:00.000Z",
            upper: "2025-12-31T23:59:59.000Z",
          },
        },
      },
      intro: [
          "Esta plataforma web interactiva se desarrolla en el marco del mandato del Grupo Interdisciplinario de Expertas y Expertos Independientes (GIEI) para Honduras, el cual busca esclarecer hechos de violencia, identificar patrones de impunidad y contribuir a la memoria, la verdad, justicia y reparación en el caso del asesinato de la líder y defensora lenca, Berta Cáceres Flores, el 3 de marzo de 2016. La documentación aquí presentada aporta insumos técnicos y contextuales que complementan los esfuerzos de esclarecimiento y dignificación de las víctimas. ",

      ],

      flags: { isInfopoup: false, isInfopopup: false },
      cover: {
        title: "Introducción",
        exploreButton: "PLATAFORMA",
        narrativeButton: "NARRATIVAS",
        description: [
          "Esta plataforma web interactiva se desarrolla en el marco del mandato del Grupo Interdisciplinario de Expertas y Expertos Independientes (GIEI) para Honduras, el cual busca esclarecer hechos de violencia, identificar patrones de impunidad y contribuir a la memoria, la verdad, justicia y reparación en el caso del asesinato de la líder y defensora lenca, Berta Cáceres Flores, el 2 de marzo de 2016. La documentación aquí presentada aporta insumos técnicos y contextuales que complementan los esfuerzos de esclarecimiento y dignificación de las víctimas. ",
          "## Alcance de la investigación",
          "Esta plataforma interactiva reúne incidentes, evidencias y contextos relacionados con el caso del asesinato de Berta Cáceres Flores y el entramado de actores, infraestructuras y decisiones que lo rodean. El foco está en episodios que evidencian posibles daños a civiles, afectaciones a comunidades y territorios, construcción de infraestructuras, patrones de control territorial y relaciones entre distintos actores de distintas agrupaciones, como el Consejo Cívico de Organizaciones Populares e Indígenas de Honduras (COPINH), corporativos, agentes estatales de seguridad, instituciones del estado hondureño, y criminales sentenciados. La plataforma no pretende ser exhaustiva, sino un muestrario de narrativas y evidencias cuya localización y contexto han sido suficientemente corroborados para su publicación.",
          "## Fuentes",
          "Los insumos de la investigación provienen principalmente de evidencia forense y documentación judicial obtenida durante el proceso penal del caso Berta Cáceres: registros telefónicos y extracciones de dispositivos de los imputados, más de 400,000 chats de WhatsApp, transacciones financieras y correos electrónicos de bancos internacionales, títulos de propiedad y escrituras de compra de terrenos, censos de la comunidad Río Blanco, expedientes judiciales (sentencias y declaraciones), y estudios técnicos sobre el proyecto hidroeléctrico. Esta información ha sido complementada con materiales de acceso público cuando su divulgación no compromete a personas o procesos en curso. Cuando el material proviene de fuentes abiertas, se mantiene el enlace original y se resguarda una copia para preservación. La presencia de un enlace no implica afiliación entre quienes publicaron el contenido y este proyecto.",
          "## Niveles de verificación",
          "Cada registro documentado en esta plataforma pasa por controles de verificación que incluyen: autenticidad de la fuente, coherencia temporal, geolocalización mediante referencias cruzadas con mapas satelitales y cartografía oficial, y triangulación con múltiples fuentes cuando están disponibles. Los puntos del mapa, trayectorias y ubicaciones que se muestran públicamente han alcanzado un nivel de certeza espacial suficiente para su publicación; casos con localización incierta o que requieren protección adicional se resguardan para análisis interno del GIEI. La verificación forense avanzada para uso probatorio en procesos judiciales requiere peritajes especializados y se desarrolla en el marco del mandato oficial del GIEI, surgido de un acuerdo entre el gobierno hondureño y la Organización de los Estados Americanos (OEA).",
          "## Descripciones y límites",
          "Las fichas describen lo que es claramente visible o documentalmente sustentable: qué, cuándo, dónde y con qué afectaciones plausibles. No se infieren números precisos de víctimas ni se atribuye responsabilidad a una parte sin evidencia suficiente y trazable. Los campos narrativos priorizan la claridad, señalan incertidumbres y distinguen entre observación, inferencia y contexto. Los límites geográficos de los incidentes se representan con la mayor precisión posible según la evidencia disponible, pero no pretenden ser exhaustivos ni definitivos. La representación espacial busca equilibrar precisión y respeto por la privacidad y seguridad de las comunidades afectadas.",
          "## Filtros y navegación",
          "En el panel lateral puedes activar eventos por distintas categorías, seleccionar un periodo temporal, y activar capas geográficas y analíticas. Entre otros:",
          "-Tipos de eventos: agresiones, concesiones, comunicaciones, transacciones, acciones de defensa del territorio.",
          "-Actores involucrados: bancos y fondos internacionales, ejecutivos y personal de empresas o de seguridad privada, autoridades militares y policiales, actores de redes criminales, miembros del COPINH y comunidades afectadas.",
          "-Capas territoriales: comunidades lencas afectadas (La Tejera, El Barreal, Río Blanco, La Vega), predios adquiridos por DESA, ubicaciones del proyecto hidroeléctrico (versiones de 2009 y 2013), infraestructuras relacionadas.",
          "Las clasificaciones se basan en evidencia documental proveniente de expedientes judiciales, testimonios y registros oficiales; cada evento está vinculado a sus fuentes primarias para garantizar trazabilidad y verificabilidad.",
          "## Privacidad, seguridad y respecto",
          "El material puede ser sensible o perturbador. Se aplican medidas de minimización de daño: difuminado o recorte cuando hay riesgo de identificación de personas en situación de vulnerabilidad; exclusión de imágenes de cuerpos que permitan identidad directa; desajuste deliberado de coordenadas públicas en rangos prudentes cuando la revelación precisa implique riesgo. Se retiran datos personales no esenciales y se atienden solicitudes fundadas de retiro o mayor resguardo. ",
          "## Créditos",
          "Esta investigación, plataforma y videos fue desarrollada por el equipo de re/presentare en colaboración con el GIEI de Honduras para el caso del asesinato de Berta Cáceres. La plataforma utiliza código abierto desarrollado por Forensic Architecture y Bellingcat. ",

        ],
      },
      toolbar: {
        panels: {
          categories: {},
        },
      },
      spotlights: {},
    },
    ui: {
      coloring: {
        mode: "STATIC",
        maxNumOfColors: 20,
        defaultColor: "#dfdfdf",
        colors: [
          "#dfdfdf",
          "#D97A07", // 1
          "#F2A30F", // 2
          "#F2BC1B", // 3
          "#F2CE16", // 4
          "#FCE98B", // 5
          "#00700E", // 6
          "#009E5F", // 7
          "#30CF60", // 8
          "#8DD483", // 9
          "#A9D636", // 10
          "#C90000", // 11
          "#CCF5EF", // 12
          "#83D3D4", // 13
          "#7A548F", // 14
          "#2E99CA", // 15
          "#8F3C6A", // 16
          "#792AF5", // 17
          "#C628F7", // 18
          "#D422AC", // 19
          "#EB3147", // 20
          "#D43E22", // 21
          "#F66515", // 22
          "#F48B1B", // 23
          "#F3F3F5", // 24
          "#C4C4EE", // 25
          "#B3CCF0", // 26
          "#8AA4DD", // 27
          "#EBE6D2", // 28
          "#DECCA6", // 29

          // resto (se mantiene igual que antes)
          "#e0a63a", // 30
          "#8a6a1f", // 31
          "#fff1cf", // 32
          "#8f1d24", // 33
          "#ff8a80", // 34
          "#c93a3f", // 35
          "#5f0f14", // 36
          "#123b6d", // 37
          "#2b6cb0", // 38
          "#7aa6d8", // 39
          "#0a1f33", // 40
        ]
      },
      card: {
        layout: {
          template: "sourced",
        },
      },
      carto: {
        eventRadius: 8,
      },
      timeline: {
        eventRadius: 9,
      },
      tiles: {
        current: "ikerluna/cm7b6ykln005d01s7fdffhda4",
        //current: ikerluna/cmicitjth00b701s4aarcc81h",
        default: "ikerluna/cm7b6ykln005d01s7fdffhda4",
        //default: "ikerluna/cmicitjth00b701s4aarcc81h",
        satellite: "ikerluna/cmicey2jk00ay01s44px2evzg",


      },
    },
    features: {
      USE_CATEGORIES: false,
      CATEGORIES_AS_FILTERS: true,
      COLOR_BY_CATEGORY: false,
      COLOR_BY_ASSOCIATION: true,
      USE_ASSOCIATIONS: true,
      USE_FULLSCREEN: true,
      USE_DOWNLOAD: false,
      USE_SOURCES: true,
      USE_SPOTLIGHTS: false,
      USE_SHAPES: false,
      USE_COVER: true,
      USE_INTRO: false,
      USE_SATELLITE_OVERLAY_TOGGLE: true,
      USE_SEARCH: false,
      USE_SITES: false,
      USE_GEOJSON_LAYERS: true,
      ZOOM_TO_TIMEFRAME_ON_TIMELINE_CLICK: one_day,
      FETCH_EXTERNAL_MEDIA: false,
      USE_MEDIA_CACHE: false,
      GRAPH_NONLOCATED: false,
      NARRATIVE_STEP_STYLES: true, // ✅ permite estilos de pasos narrativos
      CUSTOM_EVENT_FIELDS: [],
    },
    GEOJSON_LAYERS: [
      
    ],
  },
};

export default config;
