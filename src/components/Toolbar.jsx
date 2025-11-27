import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import * as selectors from "../selectors";
import config from "../../config";
import ToolbarNavigateButton from "./ToolbarNavigateButton";

// Agregar capas de GeoJSON (AHORA SE CARGAN AUTOMÁTICAMENTE)
import GeoJsonLayers from "./controls/GeoJsonLayers";

import { Tabs, TabList, TabPanel } from "react-tabs";
import FilterListPanel from "./controls/FilterListPanel";
import CategoriesListPanel from "./controls/CategoriesListPanel";
import ShapesListPanel from "./controls/ShapesListPanel";
import BottomActions from "./controls/BottomActions";
import copy from "../common/data/copy.json";

import {
  trimAndEllipse,
  getImmediateFilterParent,
  getFilterSiblings,
  getFilterAncestors,
  addToColoringSet,
  removeFromColoringSet,
  mapCategoriesToPaths,
  getCategoryIdxs,
  getFilterIdx
} from "../common/utilities";

import { ToolbarButton } from "./controls/atoms/ToolbarButton";
import { FullscreenToggle } from "./controls/FullScreenToggle";
import DownloadPanel from "./controls/DownloadPanel";
import NarrativeControls from "./controls/NarrativeControls";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.onSelectFilter = this.onSelectFilter.bind(this);
    this.state = { _selected: 0, _active: false };
  }

  selectTab(selected) {
    let active = !(this.state._selected === selected && this.state._active);
    this.setState({ _selected: selected, _active: active });
  }

  onSelectFilter(key, matchingKeys) {
    const { filters, activeFilters, coloringSet, maxNumOfColors } = this.props;

    const parent = getImmediateFilterParent(key);
    const isTurningOff = activeFilters.includes(key);

    if (!isTurningOff) {
      const updatedColoringSet = addToColoringSet(coloringSet, matchingKeys);
      if (updatedColoringSet.length <= maxNumOfColors) {
        this.props.actions.updateColoringSet(updatedColoringSet);
      }
    } else {
      if (parent && activeFilters.includes(parent)) {
        const siblings = getFilterSiblings(filters, parent, key);
        const siblingsOff = siblings.every((s) => !activeFilters.includes(s));

        if (siblingsOff) {
          const grandparentsOn = getFilterAncestors(key).filter((f) =>
            activeFilters.includes(f)
          );
          matchingKeys = matchingKeys.concat(grandparentsOn);
        }
      }

      const updatedColoringSet = removeFromColoringSet(coloringSet, matchingKeys);
      this.props.actions.updateColoringSet(updatedColoringSet);
    }

    this.props.methods.onSelectFilter(matchingKeys);
    this.props.actions.updateSelected([]);
  }

  renderClosePanel() {
    return (
      <div
        className="panel-header"
        onClick={() => this.selectTab(this.state._selected)}
      >
        <div className="caret" />
      </div>
    );
  }

  goToNarrative(narrative) {
    this.props.methods.onSelectNarrative(narrative);
  }

  renderToolbarNarrativePanel() {
    const { panels } = this.props.toolbarCopy;
    const { narratives } = this.props;

    return (
      <TabPanel>
        <h2>{panels.narratives.label}</h2>
        <p>{panels.narratives.description}</p>

        {narratives.map((narr) => (
          <div key={narr.id} className="panel-action action">
            <button onClick={() => this.goToNarrative(narr)}>
              <p>
                <strong>{narr.label || narr.id}</strong>
              </p>
              <p>
                <small>{trimAndEllipse(narr.description || narr.desc || "", 120)}</small>
              </p>
            </button>
          </div>
        ))}

        <NarrativeControls
          narratives={narratives}
          onSelectNarrative={this.goToNarrative.bind(this)}
        />
      </TabPanel>
    );
  }

  renderToolbarCategoriesPanel() {
    const { categories: panelCategories } = this.props.toolbarCopy.panels;
    const catMap = mapCategoriesToPaths(
      this.props.categories,
      Object.keys(panelCategories)
    );

    return (
      <div>
        {Object.keys(catMap).map((type) => (
          <TabPanel key={type}>
            <CategoriesListPanel
              categories={catMap[type]}
              activeCategories={this.props.activeCategories}
              onCategoryFilter={this.props.methods.onCategoryFilter}
              language={this.props.language}
              title={panelCategories[type].label}
              description={panelCategories[type].description}
            />
          </TabPanel>
        ))}
      </div>
    );
  }

  renderToolbarFilterPanel() {
    const { panels } = this.props.toolbarCopy;

    return (
      <TabPanel>
        <FilterListPanel
          filters={this.props.filters}
          activeFilters={this.props.activeFilters}
          onSelectFilter={this.onSelectFilter}
          language={this.props.language}
          coloringSet={this.props.coloringSet}
          filterColors={this.props.filterColors}
          title={panels.filters.label}
          description={panels.filters.description}
        />
      </TabPanel>
    );
  }

  renderToolbarShapePanel() {
    const { panels } = this.props.toolbarCopy;

    if (!this.props.features.USE_SHAPES) return null;

    return (
      <TabPanel>
        <ShapesListPanel
          shapes={this.props.shapes}
          activeShapes={this.props.activeShapes}
          onShapeFilter={this.props.methods.onShapeFilter}
          language={this.props.language}
          title={panels.shapes.label}
          description={panels.shapes.description}
        />
      </TabPanel>
    );
  }

  renderToolbarDownloadPanel() {
    const { panels } = this.props.toolbarCopy;

    return (
      <TabPanel>
        <DownloadPanel
          language={this.props.language}
          title={panels.download.label}
          description={panels.download.description}
          domain={this.props.domain}
        />
      </TabPanel>
    );
  }

  renderToolbarPanels() {
    const { features, narratives } = this.props;
    const classes =
      this.state._active ? "toolbar-panels" : "toolbar-panels folded";

    return (
      <div className={classes}>
        {this.renderClosePanel()}
        {narratives.length !== 0 && this.renderToolbarNarrativePanel()}
        {features.USE_CATEGORIES && this.renderToolbarCategoriesPanel()}
        {features.USE_ASSOCIATIONS && this.renderToolbarFilterPanel()}
        {features.USE_SHAPES && this.renderToolbarShapePanel()}
        {features.USE_DOWNLOAD && this.renderToolbarDownloadPanel()}

        {features.USE_GEOJSON_LAYERS && (
          <TabPanel>
            {window.__LEAFLET_MAP__ ? (
              <GeoJsonLayers map={window.__LEAFLET_MAP__} />
            ) : (
              <p style={{ padding: "1rem" }}>⏳ Esperando inicialización del mapa…</p>
            )}
          </TabPanel>
        )}
      </div>
    );
  }

  renderToolbarTab(_selected, label, iconKey, key) {
    return (
      <ToolbarButton
        key={key}
        label={label}
        iconKey={iconKey}
        isActive={this.state._selected === _selected && this.state._active}
        onClick={() => this.selectTab(_selected)}
      />
    );
  }

  renderToolbarTabs() {
    const { features, narratives, toolbarCopy } = this.props;
    const { panels } = toolbarCopy;

    const narrativesIdx = 0;
    const narrativesExist = narratives.length !== 0;

    const categoryIdxs = getCategoryIdxs(
      Object.keys(panels.categories),
      narrativesExist ? 1 : 0
    );

    const numCategoryPanels = Object.keys(categoryIdxs).length;

    const filtersIdx = getFilterIdx(
      narrativesExist,
      features.USE_CATEGORIES,
      numCategoryPanels
    );

    const shapesIdx = filtersIdx + features.USE_SHAPES;
    const downloadIdx = shapesIdx + features.USE_DOWNLOAD;

    const title = config.display_title || copy[this.props.language].toolbar.title;

    return (
      <div className="toolbar">
        <div className="toolbar-header" onClick={this.props.methods.onTitle}>
          <p>{title}</p>
          <ToolbarNavigateButton />
        </div>

        <div className="toolbar-tabs">
          <TabList>
            {narrativesExist &&
              this.renderToolbarTab(
                narrativesIdx,
                panels.narratives.label,
                panels.narratives.icon
              )}

            {features.USE_CATEGORIES &&
              Object.keys(categoryIdxs).map((key) =>
                this.renderToolbarTab(
                  categoryIdxs[key],
                  panels.categories[key].label,
                  panels.categories[key].icon,
                  key
                )
              )}

            {features.USE_ASSOCIATIONS &&
              this.renderToolbarTab(
                filtersIdx,
                panels.filters.label,
                panels.filters.icon
              )}

            {features.USE_SHAPES &&
              this.renderToolbarTab(
                shapesIdx,
                panels.shapes.label,
                panels.shapes.icon
              )}

            {features.USE_DOWNLOAD &&
              this.renderToolbarTab(
                downloadIdx,
                panels.download.label,
                panels.download.icon
              )}

            {features.USE_GEOJSON_LAYERS &&
              this.renderToolbarTab(downloadIdx + 1, "Capas", "layers")}

            {features.USE_FULLSCREEN && (
              <FullscreenToggle language={this.props.language} />
            )}
          </TabList>
        </div>

        <BottomActions
          info={{
            enabled: this.props.infoShowing,
            toggle: this.props.actions.toggleInfoPopup,
          }}
          sites={{
            enabled: this.props.sitesShowing,
            toggle: this.props.actions.toggleSites,
          }}
          cover={{
            toggle: this.props.actions.toggleCover,
          }}
          features={this.props.features}
        />

        <div id="made-with">
          Elaborado con{" "}
          <a href="https://github.com/forensic-architecture/timemap">TimeMap</a>
          <br />
          Software libre de{" "}
          <a href="https://forensic-architecture.org">Forensic Architecture</a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        id="toolbar-wrapper"
        className={`toolbar-wrapper ${
          this.props.isNarrative ? "narrative-mode" : ""
        }`}
      >
        <Tabs
          onSelect={() => null}
          selectedIndex={this.state._selected}
        >
          {this.renderToolbarTabs()}
          {this.renderToolbarPanels()}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: selectors.getFilters(state),
    categories: selectors.getCategories(state),
    narratives: selectors.selectNarratives(state) || [],
    shapes: selectors.getShapes(state),
    language: state.app.language,
    toolbarCopy: state.app.toolbar,
    activeFilters: selectors.getActiveFilters(state),
    activeCategories: selectors.getActiveCategories(state),
    activeShapes: selectors.getActiveShapes(state),
    sitesShowing: state.app.flags.isShowingSites,
    infoShowing: state.app.flags.isInfopopup,
    coloringSet: state.app.associations.coloringSet,
    maxNumOfColors: state.ui.coloring.maxNumOfColors,
    filterColors: state.ui.coloring.colors,
    eventRadius: state.ui.eventRadius,
    features: selectors.getFeatures(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
