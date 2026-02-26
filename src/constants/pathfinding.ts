import type { Direction } from "../types/map.types";

export const DIRECTIONS: Direction[] = [
  { y: 1, x: 0, name: "DOWN" },
  { y: -1, x: 0, name: "UP" },
  { y: 0, x: 1, name: "RIGHT" },
  { y: 0, x: -1, name: "LEFT" },
];

export const ARROW_SYMBOLS = {
  UP: "↑",
  DOWN: "↓",
  LEFT: "←",
  RIGHT: "→",
} as const;
