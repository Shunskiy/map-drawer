import { MapEntites } from "../types/map.types";
import type { MapEntityType, PathStep, QueueItem } from "../types/map.types";
import { DIRECTIONS } from "../constants/pathfinding";
import { findEntityInGrid, isValidPosition } from "./grid.utils";

interface PathfindingResult {
  path: string[];
  coordinates: PathStep[];
}

export const findShortestPath = (
  grid: MapEntityType[][],
  target: MapEntityType
): PathfindingResult | null => {
  const start = findEntityInGrid(grid, MapEntites.START);

  if (!start) {
    return null;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const queue: QueueItem[] = [
    {
      row: start.row,
      col: start.col,
      path: [],
      coordinates: [],
    },
  ];

  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    const current = queue.shift()!;

    for (const direction of DIRECTIONS) {
      const nextRow = current.row + direction.y;
      const nextCol = current.col + direction.x;

      if (!isValidPosition(nextRow, nextCol, rows)) {
        continue;
      }

      if (visited[nextRow][nextCol]) {
        continue;
      }

      if (grid[nextRow][nextCol] === MapEntites.EMPTY) {
        continue;
      }

      const newPath = [...current.path, direction.name];

      if (grid[nextRow][nextCol] === target) {
        const finalCoordinates = [
          ...current.coordinates,
          { row: current.row, col: current.col, direction: direction.name },
        ];
        return {
          path: newPath,
          coordinates: finalCoordinates,
        };
      }

      const newCoordinates = [
        ...current.coordinates,
        { row: nextRow, col: nextCol, direction: direction.name },
      ];

      visited[nextRow][nextCol] = true;
      queue.push({
        row: nextRow,
        col: nextCol,
        path: newPath,
        coordinates: newCoordinates,
      });
    }
  }

  return null;
};
