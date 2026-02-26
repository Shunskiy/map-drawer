export const MapEntites = {
  EMPTY: 0,
  CELL: 1,
  TREASURE: 2,
  BOSS: 3,
  SHOP: 4,
  VISITED: 5,
  START: 6,
} as const;

export type MapEntityType = (typeof MapEntites)[keyof typeof MapEntites];

export interface PathStep {
  row: number;
  col: number;
  direction: string;
}

export interface MapState {
  gridSize: number;
  grid: MapEntityType[][];
  selectedEntity: MapEntityType;
  shortPath: string[] | null;
  pathCoordinates: PathStep[];
  targetEntity: MapEntityType | null;
  visiblePathLength: number;
}

export interface Direction {
  x: number;
  y: number;
  name: string;
}

export interface QueueItem {
  row: number;
  col: number;
  path: string[];
  coordinates: PathStep[];
}
