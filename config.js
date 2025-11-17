const one_day = 1440;

const config = {
  title: "Berta",
  display_title: "Berta",
  SERVER_ROOT: "",
  EVENTS_EXT: "/data/events1.json",
  SOURCES_EXT: "/data/sources1.json",
  ASSOCIATIONS_EXT: "/data/associations1.json",
  NARRATIVE_EXT: "narratives/narratives.json",

  API_DATA: "",
  MAPBOX_TOKEN:
    "pk.eyJ1IjoiYmVsbGluZ2NhdC1tYXBib3giLCJhIjoiY2tleW0wbWliMDA1cTJ5bzdkbTRraHgwZSJ9.GJQkjPzj8554VhR5SPsfJg",

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
          { label: "Zoom to 1 year", duration: 12 * 31 * one_day },
          { label: "Zoom to 8 years", duration: 96 * 31 * one_day },
        ],
        range: {
          // ✅ Define el rango de fechas visible al iniciar
          initial: ["2013-01-01T00:00:00.000Z", "2025-12-31T23:59:59.000Z"],
          initialDaysShown: 31 * 12,
          limits: {
            lower: "2013-01-01T00:00:00.000Z",
            upper: "2025-12-31T23:59:59.000Z",
          },
        },
      },
      intro: [
        // (puedes mantener este bloque igual)
      ],

      flags: { isInfopoup: false, isCover: false },
      cover: {
        title: "About and Methodology",
        exploreButton: "BACK TO THE PLATFORM",
        description: [
          // (mantén este bloque igual)
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
        maxNumOfColors: 9,
        defaultColor: "#dfdfdf",
        colors: [
          "#7E57C2",
          "#F57C00",
          "#FFEB3B",
          "#D34F73",
          "#08B2E3",
          "#A1887F",
          "#90A4AE",
          "#E57373",
          "#80CBC4",
        ],
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
        current: "bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy",
        default: "bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy",
        satellite: "bellingcat-mapbox/cl1win2vp003914pdhateva6p",
      },
    },
    features: {
      USE_CATEGORIES: true,
      USE_NARRATIVES: true, // ✅ Activa narrativas
      CATEGORIES_AS_FILTERS: true,
      COLOR_BY_CATEGORY: false,
      COLOR_BY_ASSOCIATION: true,
      USE_ASSOCIATIONS: true,
      USE_FULLSCREEN: true,
      USE_DOWNLOAD: true,
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
      "public/geojson/Rio Gualcarque.geojson",
      "public/geojson/Poligonos_Predios_Sisimetera.geojson",
    ],
  },
};

export default config;
