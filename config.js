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
        '<div class="two-columns"><div class="two-columns_column"><figure><img style="width: 100%; display:block;" src="https://bellingcat-embeds.ams3.cdn.digitaloceanspaces.com/ukraine-timemap/cover01-s.jpg" frameborder="0"><figcaption>Image: Vyacheslav Madiyevskyy/Reuters</figcaption></figure></div><div class="two-columns_column"><figure><img style="width: 100%; display:block;" src="https://bellingcat-embeds.ams3.cdn.digitaloceanspaces.com/ukraine-timemap/cover02-s.jpg" frameborder="0"><figcaption>Image: Järva Teataja/Scanpix Baltics via Reuters</figcaption></figure></div></div>',
        'This map plots out and highlights incidents that have resulted in potential civilian impact or harm since Russia began its invasion of Ukraine. The incidents detailed have been collected by Bellingcat researchers. Included in the map are instances where civilian areas and infrastructure have been damaged or destroyed, where the presence of civilian injuries are visible and/or there is the presence of immobile civilian bodies. Collection for the incidences contained in this map began on February 24, 2022. Users can explore incidents by date and location. We intend this to be a living project that will continue to be updated as long as the conflict persists. For more detailed information about the entries included in this map, please refer to our methodology and explainer article which can be read <a href="https://www.bellingcat.com/news/2022/03/17/hospitals-bombed-and-apartments-destroyed-mapping-incidents-of-civilian-harm-in-ukraine/" >here</a>.',
        '<p><b>Editor\'s note</b>: An error in our archiving system between October 21 and November 7 led to some incidents being published on our TimeMap before they were fully verified. We have fixed this issue and are working to verify all extra incidents.</p>',
      ],

      flags: { isInfopoup: false, isInfopopup: false },
      cover: {
        title: "About and Methodology",
        exploreButton: "PLATAFORMA",
        narrativeButton: "NARRATIVAS",
        description: [
          "## Scope of Research",
          "This database, organised on Forensic Architecture's [TimeMap](https://github.com/forensic-architecture/timemap) platform and customised for this project, is focused on incidents in Ukraine that have resulted in potential civilian harm. These include: incidents where rockets or missiles struck civilian areas, where attacks have resulted in the destruction of civilian infrastructure, where the presence of civilian injuries are visible and/or the presence of immobile civilian bodies. This database began collection on February 24, 2022 and intends to be a living document that will continue to be updated as long as the conflict persists. While we are attempting to collect as many incidents as possible, we cannot possibly guarantee to collect them all nor will we be able to corroborate the locations of all the incidents we collect. Those we do not corroborate the originality or exact location of will not be shown on the map. Therefore, this map is not an exhaustive list of civilian harm in Ukraine but rather a representation of all incidents which we have been able to collect and of which we have been able to determine the exact locations. ",
          "## Open Source Footage",
          "The links in this map are all open source, meaning they are connected to an open link posted online. These sources were collected by Bellingcat researchers and placed in a database from where they are also being archived locally. After collection, our Global Authentication Project members have determined the location of each of these events <small>(you can read more about the Global Authentication Project and its makeup below)</small>. Bellingcat staff then cross-referenced these coordinates to ensure their accuracy. The resolution of these geolocations is within 150 metres of where the incident occurred but the public coordinates viewable on the map have been slightly obscured in order to protect the identity of the creators. Because this footage is open source, the users who uploaded the content are not directly affiliated to Bellingcat or our partners. Any opinions that may be contained within the posts are therefore not those of Bellingcat or our partners. Any claims contained within the posts have also not necessarily been confirmed or verified by Bellingcat, particularly in relation to which party may have been responsible for the incidents detailed.",
          "## Verification Level",
          "The data being collected is checked for originality, basic manipulation, and location by Bellingcat investigators. This level of verification is intended to indicate where incidents took place, when and where there are reasonable visual indications of civilian harm. Our investigation plan for the collection of this material and its uses are informed by the [Berkeley Protocol on Digital Open Source Investigations](https://www.ohchr.org/en/publications/policy-and-methodological-publications/berkeley-protocol-digital-open-source). These incidents are also being collected and archived at a [forensic level](https://mnemonic.org/en/our-work) for potential evidentiary use in the future. That level of in-depth analysis and verification will take many months and our goal with this map is to transparently report on the current situation in Ukraine, as it is happening, for public interest. To be clear, these two processes will be separate.",
          "## Descriptions",
          "Each incident is accompanied with source links, the exact location determined by our Global Authentication Project and Bellingcat researchers, as well as a brief description of the incident based on what is visually present. The descriptions indicate what is clearly visible but do not attempt to make assumptions about the exact number of casualties or which party to the conflict is responsible due to those factors being difficult to fully determine from short, visual imagery alone.",
          "## Filters",
          "On the left hand side of the map, a user can toggle between different kinds of areas impacted. We are characterising the areas as residential, industrial, administrative, healthcare, school/childcare, military, commercial, religious, or undefined. Decisions on these classifications are  based on  visual evidence in the footage and what the area is reportedly used as. We cannot fully exclude or exhaustively search for the potential of military use in some of these areas.",
          "## Source Links/Embedding",
          "We have chosen to embed the social media links directly onto the platform.  Should any be deleted by the uploader, they will still be visible on the map, but data on the post, user and footage will no longer be presented publicly. Where sensitive footage posted by individuals might allow them or their location to be identified, we have sought to preemptively take steps to anonymise these users.",
          "## Privacy concerns and respect for the dead ",
          "This footage is graphic and contains distressing scenes of war and conflict. Many of the areas represented are, at time of writing, also under attack both physically and through online attempts to discredit or harm users posting this content. For these reasons, we have chosen not to share certain posts that might indicate the direct identity of any of the persons filming. We have also filtered out posts that contain images where an immobile body is closely filmed and their identity might be ascertained out of respect for them and their close ones.",
          "## A Note on Bellingcat's Global Authentication Project",
          "The Global Authentication Project consists of a wide community of open source researchers assisting in Bellingcat research through structured tasks and feedback. Our aim is to authenticate events taking place around the world and fill in the gaps of knowledge that exist, particularly in situations where there are vast quantities of data. In creating a community for those interested in open source research, we are fostering Bellingcat's original aim of solving problems **together**, to diversify our investigations and promote the use of these skills. For this dataset, we are working with many individuals who have Ukrainian language skills and others with local contextual knowledge of the events and places seen on the map. Other participants include individuals skilled in geolocation and chronolocation, with all contributions being vetted by Bellingcat researchers. As we expand the Global Authentication Project in the coming months, more information will be available on our website and Twitter.",
          "## Feedback",
          "This map will continue to change and be updated for the duration of this conflict. We welcome feedback on our methodology,  data collection and take transparency seriously. Should you have any direct feedback about the platform, please indicate it on this [form](https://forms.gle/cV2YAojBoh6h4T3XA).",
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
          "#bd1783",
          "#ee1504",
          "#fa8b31",
          "#FFEB3B",
          "#D34F73",
          "#08B2E3",
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
      "public/geojson/Rio Gualcarque.geojson",
      "public/geojson/Poligonos_Predios_Sisimetera.geojson",
    ],
  },
};

export default config;
