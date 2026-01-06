import { useState } from "react";
import Checkbox from "../atoms/Checkbox";
import { marked } from "marked";
import {
  aggregateFilterPaths,
  getFilterIdxFromColorSet,
  getPathLeaf,
} from "../../common/utilities";

/** recursively get an array of node keys to toggle */
function getFiltersToToggle(filter, activeFilters) {
  const [key, children] = filter;

  const turningOff = activeFilters.includes(key);
  const childKeys = Object.entries(children)
    .flatMap((filter) => getFiltersToToggle(filter, activeFilters))
    .filter((child) => activeFilters.includes(child) === turningOff);

  childKeys.push(key);
  return childKeys;
}

function FilterListPanel({
  filters,
  activeFilters,
  onSelectFilter,
  language,
  coloringSet,
  filterColors,
  title,
  description,
}) {
  // 🔥 NUEVO: estado de nodos abiertos/cerrados
  const [openNodes, setOpenNodes] = useState({});

  function toggleNode(key) {
    setOpenNodes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function createNodeComponent(filter, depth) {
    const [key, children] = filter;
    const pathLeaf = getPathLeaf(key);
    const hasChildren = Object.keys(children).length > 0;

    const matchingKeys = getFiltersToToggle(filter, activeFilters);
    const idxFromColorSet = getFilterIdxFromColorSet(key, coloringSet);
    const assignedColor =
      idxFromColorSet !== -1 && activeFilters.includes(key)
        ? filterColors[idxFromColorSet]
        : "";

    const isOpen = openNodes[key];

    const styles = {
      color: assignedColor,
      marginLeft: `${depth * 20}px`,
    };

    return (
      <li
        key={key}
        className="filter-filter"
        style={{ ...styles }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* ▶ / ▼ TOGGLE */}
          {hasChildren && (
            <span
              onClick={() => toggleNode(key)}
              style={{
                cursor: "pointer",
                width: "16px",
                display: "inline-block",
                userSelect: "none",
              }}
            >
              {isOpen ? "▼" : "▶"}
            </span>
          )}

          {/* Checkbox */}
          <Checkbox
            label={pathLeaf}
            isActive={activeFilters.includes(key)}
            onClickCheckbox={(e) => {
              e.preventDefault();
              onSelectFilter(key, matchingKeys);
            }}
            color={assignedColor}
          />
        </div>

        {/* Children */}
        {hasChildren && isOpen && (
          <ul>
            {Object.entries(children).map((filter) =>
              createNodeComponent(filter, depth + 1)
            )}
          </ul>
        )}
      </li>
    );
  }

  function renderTree(filters) {
    const aggregatedFilterPaths = aggregateFilterPaths(filters);

    return (
      <div className="scrolled-area">
        <ul style={{ paddingLeft: 0 }}>
          {Object.entries(aggregatedFilterPaths).map((filter) =>
            createNodeComponent(filter, 0)
          )}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky-header">
        <h2>{title}</h2>
      </div>

      <div
        className="panel-description"
        dangerouslySetInnerHTML={{
          __html: marked(description),
        }}
      />

      {renderTree(filters)}
    </div>
  );
}

export default FilterListPanel;
