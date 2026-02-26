import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCell } from "../store/mapSlice";
import type { MapEntityType } from "../types/map.types";
import { ENTITY_COLORS, ENTITY_LABELS } from "../constants/entities";
import { ARROW_SYMBOLS } from "../constants/pathfinding";
import "./Grid.css";

interface PathInfo {
  direction: string;
  isLast: boolean;
}

const Grid = () => {
  const dispatch = useAppDispatch();
  const { grid, pathCoordinates, visiblePathLength } = useAppSelector(
    (state) => state.map
  );

  const handleCellClick = (row: number, col: number) => {
    dispatch(setCell({ row, col }));
  };

  const getCellColor = (entity: MapEntityType): string => {
    return ENTITY_COLORS[entity];
  };

  const getCellLabel = (entity: MapEntityType): string => {
    return ENTITY_LABELS[entity];
  };

  const getArrowSymbol = (direction: string): string => {
    return ARROW_SYMBOLS[direction as keyof typeof ARROW_SYMBOLS] || "";
  };

  const getPathInfo = (row: number, col: number): PathInfo | null => {
    const visiblePath = pathCoordinates.slice(0, visiblePathLength);
    const pathIndex = visiblePath.findIndex(
      (step) => step.row === row && step.col === col
    );

    if (pathIndex === -1) {
      return null;
    }

    return {
      direction: visiblePath[pathIndex].direction,
      isLast: pathIndex === visiblePath.length - 1,
    };
  };

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const pathInfo = getPathInfo(rowIndex, colIndex);
            const isOnPath = pathInfo !== null;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell ${isOnPath ? "on-path" : ""}`}
                style={{ backgroundColor: getCellColor(cell) }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                <span className="cell-label">{getCellLabel(cell)}</span>
                {isOnPath && (
                  <span
                    className={`cell-arrow ${pathInfo.isLast ? "arrow-appear" : ""}`}
                  >
                    {getArrowSymbol(pathInfo.direction)}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Grid;
