import { Component, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import * as actions from "../actions";
import * as selectors from "../selectors";

import Toolbar from "./Toolbar";
import InfoPopup from "./InfoPopup";
import Notification from "./Notification";
import TemplateCover from "./TemplateCover";

import Popup from "./atoms/Popup";
import StaticPage from "./atoms/StaticPage";
import MediaOverlay from "./atoms/Media";
import LoadingOverlay from "./atoms/Loading";

import Timeline from "./time/Timeline";
import Space from "./space/Space";
import Search from "./controls/Search";
import CardStack from "./controls/CardStack";
import NarrativeControls from "./controls/NarrativeControls";

import colors from "../common/global";
import { binarySearch, insetSourceFrom } from "../common/utilities";

import LayoutTemplateCover from "./LayoutTemplateCover";

/* =========================================================
   DASHBOARD (NO TOCADO)
   ========================================================= */

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleViewSource = this.handleViewSource.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.setNarrative = this.setNarrative.bind(this);
    this.setNarrativeFromFilters = this.setNarrativeFromFilters.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getCategoryColor = this.getCategoryColor.bind(this);
    this.findEventIdx = this.findEventIdx.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.selectNarrativeStep = this.selectNarrativeStep.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchDomain().then((domain) => {
      this.props.actions.updateDomain({
        domain,
        features: this.props.features,
      });
      this.props.actions.rehydrateState();
    });

    window.dispatchEvent(new Event("resize"));
  }

  handleHighlight(highlighted) {
    this.props.actions.updateHighlighted(highlighted || null);
  }

  handleViewSource(source) {
    this.props.actions.updateSource(source);
  }

  findEventIdx(theEvent) {
    const { events } = this.props.domain;
    return binarySearch(events, theEvent, (a, b) => {
      return a.datetime - b.datetime;
    });
  }

  handleSelect(selected, axis) {
    if (selected.length <= 0) {
      this.props.actions.updateSelected([]);
      return;
    }

    const matchedEvents = [];
    const TIMELINE_AXIS = 0;

    if (axis === TIMELINE_AXIS) {
      matchedEvents.push(selected);
      const { events } = this.props.domain;
      const idx = this.findEventIdx(selected);

      if (events[idx].id !== selected.id) {
        matchedEvents.push(events[idx]);
      }

      let ptr = idx - 1;
      while (
        ptr >= 0 &&
        events[idx].datetime.getTime() === events[ptr].datetime.getTime()
      ) {
        if (events[ptr].id !== selected.id) matchedEvents.push(events[ptr]);
        ptr -= 1;
      }

      ptr = idx + 1;
      while (
        ptr < events.length &&
        events[idx].datetime.getTime() === events[ptr].datetime.getTime()
      ) {
        if (events[ptr].id !== selected.id) matchedEvents.push(events[ptr]);
        ptr += 1;
      }
    } else {
      const std = { ...selected };
      delete std.sources;
      Object.values(std).forEach((ev) => matchedEvents.push(ev));
    }

    this.props.actions.updateSelected(matchedEvents);
  }

  getCategoryColor(category) {
    if (!this.props.features.USE_CATEGORIES) {
      return colors.fallbackEventColor;
    }

    const cat = this.props.ui.style.categories[category];
    if (cat) return cat;
    return this.props.ui.style.categories.default;
  }

  setNarrative(narrative) {
    if (narrative && narrative.steps.length >= 1) {
      this.handleSelect([narrative.steps[0]]);
    }
    this.props.actions.updateNarrative(narrative);
  }

  setNarrativeFromFilters(withSteps) {
    const { app, domain } = this.props;
    let activeFilters = app.associations.filters;

    if (activeFilters.length === 0) {
      alert("No filters selected, cant narrativise");
      return;
    }

    activeFilters = activeFilters.map((f) => ({ name: f }));

    const evs = domain.events.filter((ev) =>
      activeFilters.some((f) => ev.associations.includes(f.name))
    );

    if (evs.length === 0) {
      alert("No associated events, cant narrativise");
      return;
    }

    const name = activeFilters.map((f) => f.name).join("-");
    const desc = activeFilters.map((f) => f.description).join("\n\n");

    this.setNarrative({
      id: name,
      label: name,
      description: desc,
      withLines: withSteps,
      steps: evs.map(insetSourceFrom(domain.sources)),
    });
  }

  selectNarrativeStep(idx) {
    const { narrative } = this.props.app.associations;
    if (!narrative) return;

    if (typeof idx !== "number") {
      const e = idx[0] || idx;
      const found = narrative.steps.find((s) => s.id === e.id);
      idx = narrative.steps.indexOf(found);
    }

    if (idx >= 0 && idx < narrative.steps.length) {
      const step = narrative.steps[idx];
      this.handleSelect([step]);
      this.props.actions.updateNarrativeStepIdx(idx);
    }
  }

  onKeyDown(e) {
    const { narrative, selected } = this.props.app;
    const { events } = this.props.domain;

    if (selected.length === 0) return;

    const ev = selected[selected.length - 1];
    const idx = this.findEventIdx(ev);

    if (e.keyCode === 37 || e.keyCode === 38) {
      if (narrative) this.selectNarrativeStep(this.props.narrativeIdx - 1);
      else if (idx > 0) this.handleSelect(events[idx - 1], 0);
    }

    if (e.keyCode === 39 || e.keyCode === 40) {
      if (narrative) this.selectNarrativeStep(this.props.narrativeIdx + 1);
      else if (idx < events.length - 1) this.handleSelect(events[idx + 1], 0);
    }
  }

  render() {
    const { actions, app, domain, timeline, features } = this.props;

    return (
      <div>
        <Toolbar
          isNarrative={!!app.associations.narrative}
          domain={domain}
          methods={{
            onTitle: actions.toggleCover,
            onSelectFilter: (filters) =>
              actions.toggleAssociations("filters", filters),
            onCategoryFilter: (categories) =>
              actions.toggleAssociations("categories", categories),
            onShapeFilter: actions.toggleShapes,
            onSelectNarrative: this.setNarrative,
          }}
        />

        <Space
          kind={"map" in app ? "map" : "space3d"}
          onKeyDown={this.onKeyDown}
          methods={{
            onSelectNarrative: this.setNarrative,
            getCategoryColor: this.getCategoryColor,
            onSelect: app.associations.narrative
              ? this.selectNarrativeStep
              : (ev) => this.handleSelect(ev, 1),
          }}
        />

        <Timeline
          onKeyDown={this.onKeyDown}
          methods={{
            onSelect: app.associations.narrative
              ? this.selectNarrativeStep
              : (ev) => this.handleSelect(ev, 0),
            onUpdateTimerange: actions.updateTimeRange,
            getCategoryColor: this.getCategoryColor,
          }}
        />

        <CardStack
          timelineDims={timeline.dimensions}
          onViewSource={this.handleViewSource}
          onSelect={
            app.associations.narrative ? this.selectNarrativeStep : () => null
          }
          onHighlight={this.handleHighlight}
          onToggleCardstack={() => actions.updateSelected([])}
          getCategoryColor={this.getCategoryColor}
        />

        <NarrativeControls
          narrative={
            app.associations.narrative
              ? {
                  ...app.associations.narrative,
                  current: this.props.narrativeIdx,
                }
              : null
          }
          methods={{
            onNext: () =>
              this.selectNarrativeStep(this.props.narrativeIdx + 1),
            onPrev: () =>
              this.selectNarrativeStep(this.props.narrativeIdx - 1),
            onSelectNarrative: this.setNarrative,
          }}
        />

        <InfoPopup
          language={app.language}
          styles={{}}
          isOpen={app.flags.isInfopopup}
          onClose={actions.toggleInfoPopup}
        />

        {features.USE_SEARCH && (
          <Search
            narrative={app.narrative}
            queryString={app.searchQuery}
            events={domain.events}
            onSearchRowClick={this.handleSelect}
          />
        )}

        {app.source && (
          <MediaOverlay
            source={app.source}
            onCancel={() => actions.updateSource(null)}
          />
        )}

        <LoadingOverlay
          isLoading={app.loading || app.flags.isFetchingDomain}
          ui={app.flags.isFetchingDomain}
          language={app.language}
        />
      </div>
    );
  }
}

/* =========================================================
   REDUX
   ========================================================= */

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const ConnectedDashboard = connect(
  (state) => ({
    ...state,
    timeline: {
      dimensions: selectors.selectDimensions(state),
    },
    narrativeIdx: selectors.selectNarrativeIdx(state),
    narratives: selectors.selectNarratives(state),
    selected: selectors.selectSelected(state),
  }),
  mapDispatchToProps
)(Dashboard);

/* =========================================================
   ROUTING + MODAL COVER
   ========================================================= */

function DashboardWrapper(props) {
  const location = useLocation();

  if (location.pathname !== "/plataforma") {
    return null;
  }

  return <ConnectedDashboard {...props} />;
}

function LayoutWithCover(props) {
  const [showCover, setShowCover] = useState(true);

  return (
    <>
      {showCover && (
        <LayoutTemplateCover onClose={() => setShowCover(false)} />
      )}
      <DashboardWrapper {...props} />
    </>
  );
}

export default LayoutWithCover;
