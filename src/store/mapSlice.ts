import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MapEntites } from "../types/map.types";
import type { MapState, MapEntityType } from "../types/map.types";
import { createEmptyGrid } from "../utils/grid.utils";
import { findShortestPath } from "../utils/pathfinding.utils";
import { GRID_SIZE_DEFAULT } from "../constants/entities";

const initialState: MapState = {
  gridSize: GRID_SIZE_DEFAULT,
  grid: createEmptyGrid(GRID_SIZE_DEFAULT),
  selectedEntity: MapEntites.CELL,
  shortPath: null,
  pathCoordinates: [],
  targetEntity: null,
  visiblePathLength: 0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setGridSize: (state, action: PayloadAction<number>) => {
      state.gridSize = action.payload;
      state.grid = createEmptyGrid(action.payload);
      state.pathCoordinates = [];
      state.shortPath = null;
      state.visiblePathLength = 0;
    },

    setCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;

      if (
        state.selectedEntity === MapEntites.START &&
        state.grid.flat().includes(MapEntites.START)
      ) {
        alert("Start already exists on the grid");
        return;
      }

      state.grid[row][col] = state.selectedEntity;
    },

    setSelectedEntity: (state, action: PayloadAction<MapEntityType>) => {
      state.selectedEntity = action.payload;
    },

    findPath: (state, action: PayloadAction<MapEntityType>) => {
      const targetEntity = action.payload;

      state.targetEntity = targetEntity;
      state.pathCoordinates = [];
      state.shortPath = null;
      state.visiblePathLength = 0;

      const result = findShortestPath(state.grid, targetEntity);

      if (result) {
        state.shortPath = result.path;
        state.pathCoordinates = result.coordinates;
      } else {
        const entries = Object.entries(MapEntites);
        const targetName =
          entries.find(([_, value]) => value === targetEntity)?.[0] || "target";

        alert(
          result === null && !state.grid.flat().includes(MapEntites.START)
            ? "START not found on the grid"
            : `No path found to ${targetName}`,
        );
      }
    },

    clearGrid: (state) => {
      state.grid = createEmptyGrid(state.gridSize);
      state.pathCoordinates = [];
      state.shortPath = null;
      state.visiblePathLength = 0;
    },

    incrementVisiblePath: (state) => {
      if (state.visiblePathLength < state.pathCoordinates.length) {
        state.visiblePathLength += 1;
      }
    },
  },
});

export const {
  setGridSize,
  setCell,
  setSelectedEntity,
  clearGrid,
  findPath,
  incrementVisiblePath,
} = mapSlice.actions;

export default mapSlice.reducer;
