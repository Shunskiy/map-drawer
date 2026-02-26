import { MapEntites } from "../types/map.types";
import type { MapEntityType } from "../types/map.types";

export const ENTITY_COLORS: Record<MapEntityType, string> = {
  [MapEntites.EMPTY]: "#ffffff",
  [MapEntites.CELL]: "#4a90e2",
  [MapEntites.TREASURE]: "#f5a623",
  [MapEntites.BOSS]: "#e74c3c",
  [MapEntites.SHOP]: "#2ecc71",
  [MapEntites.VISITED]: "#2ecc71",
  [MapEntites.START]: "#95a5a6",
} as const;

export const ENTITY_LABELS: Record<MapEntityType, string> = {
  [MapEntites.EMPTY]: "",
  [MapEntites.CELL]: "C",
  [MapEntites.TREASURE]: "T",
  [MapEntites.BOSS]: "B",
  [MapEntites.SHOP]: "S",
  [MapEntites.VISITED]: "V",
  [MapEntites.START]: "ST",
} as const;

export const ENTITY_CONFIG = [
  { type: MapEntites.EMPTY, label: "Empty", color: ENTITY_COLORS[MapEntites.EMPTY] },
  { type: MapEntites.CELL, label: "Cell", color: ENTITY_COLORS[MapEntites.CELL] },
  { type: MapEntites.TREASURE, label: "Treasure", color: ENTITY_COLORS[MapEntites.TREASURE] },
  { type: MapEntites.BOSS, label: "Boss", color: ENTITY_COLORS[MapEntites.BOSS] },
  { type: MapEntites.SHOP, label: "Shop", color: ENTITY_COLORS[MapEntites.SHOP] },
  { type: MapEntites.START, label: "Start", color: ENTITY_COLORS[MapEntites.START] },
] as const;

export const PATH_TARGETS = [
  { type: MapEntites.BOSS, label: "Boss" },
  { type: MapEntites.TREASURE, label: "Treasure" },
  { type: MapEntites.SHOP, label: "Shop" },
] as const;

export const GRID_SIZE_MIN = 10;
export const GRID_SIZE_MAX = 20;
export const GRID_SIZE_DEFAULT = 10;

export const PATH_ANIMATION_DELAY = 200;
