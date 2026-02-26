import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setGridSize,
  setSelectedEntity,
  clearGrid,
  findPath,
  incrementVisiblePath,
} from "../store/mapSlice";
import { MapEntites } from "../types/map.types";
import type { MapEntityType } from "../types/map.types";
import {
  ENTITY_CONFIG,
  PATH_TARGETS,
  GRID_SIZE_MIN,
  GRID_SIZE_MAX,
  PATH_ANIMATION_DELAY,
} from "../constants/entities";
import "./ControlPanel.css";

const ControlPanel = () => {
  const dispatch = useAppDispatch();
  const {
    gridSize,
    selectedEntity,
    grid,
    shortPath,
    targetEntity,
    pathCoordinates,
    visiblePathLength,
  } = useAppSelector((state) => state.map);

  useEffect(() => {
    if (pathCoordinates.length > 0 && visiblePathLength < pathCoordinates.length) {
      const timer = setTimeout(() => {
        dispatch(incrementVisiblePath());
      }, PATH_ANIMATION_DELAY);

      return () => clearTimeout(timer);
    }
  }, [pathCoordinates.length, visiblePathLength, dispatch]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGridSize(parseInt(e.target.value)));
  };

  const handleEntitySelect = (entity: MapEntityType) => {
    if (entity === MapEntites.START && grid.flat().includes(MapEntites.START)) {
      alert("Start already exists on the grid");
      dispatch(setSelectedEntity(MapEntites.EMPTY));
      return;
    }
    dispatch(setSelectedEntity(entity));
  };

  const handleFindPath = (entity: MapEntityType) => {
    dispatch(findPath(entity));
  };

  const handleClear = () => {
    dispatch(clearGrid());
  };

  const getEntityName = (entity: MapEntityType): string => {
    const entries = Object.entries(MapEntites);
    const found = entries.find(([_, value]) => value === entity);
    return found ? found[0] : "Unknown";
  };

  return (
    <div className="control-panel">
      <div className="control-section">
        <label>
          Grid Size: {gridSize}x{gridSize}
          <input
            type="range"
            min={GRID_SIZE_MIN}
            max={GRID_SIZE_MAX}
            value={gridSize}
            onChange={handleSizeChange}
          />
        </label>
      </div>

      <div className="control-section">
        <h3>Select Entity:</h3>
        <div className="entity-buttons">
          {ENTITY_CONFIG.map((entity) => (
            <button
              key={entity.type}
              className={`entity-button ${selectedEntity === entity.type ? "active" : ""}`}
              style={{ backgroundColor: entity.color }}
              onClick={() => handleEntitySelect(entity.type)}
            >
              {entity.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h3>Find Shortest Path:</h3>
        <div className="entity-buttons">
          {PATH_TARGETS.map((target) => (
            <button
              key={target.type}
              className="path-button"
              onClick={() => handleFindPath(target.type)}
            >
              {target.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-section">
        <button className="clear-button" onClick={handleClear}>
          Clear Grid
        </button>
      </div>

      {shortPath && targetEntity !== null && (
        <div className="control-section path-info">
          <h3>Path to {getEntityName(targetEntity)}:</h3>
          <p className="path-directions">{shortPath.join(" → ")}</p>
          <p className="path-steps">Steps: {shortPath.length}</p>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
