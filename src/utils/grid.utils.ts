import { MapEntites } from "../types/map.types";
import type { MapEntityType } from "../types/map.types";

export const createEmptyGrid = (size: number): MapEntityType[][] => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(MapEntites.EMPTY));
};

export const findEntityInGrid = (
  grid: MapEntityType[][],
  entity: MapEntityType
): { row: number; col: number } | null => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === entity) {
        return { row: i, col: j };
      }
    }
  }
  return null;
};

export const isValidPosition = (
  row: number,
  col: number,
  gridSize: number
): boolean => {
  return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
};
