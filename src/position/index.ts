import { CSSProperties } from "react";
import { Place } from "src/position/place";

type StylePosition = Pick<CSSProperties, "left" | "top">;

export type Position = [number, number];

export function stylePosition([x, y]: Position): StylePosition {
  return {
    left: `${x}px`,
    top: `${y}px`,
  };
}

export function calcStylePosition(
  target: Position,
  tooltipRect: DOMRect | null,
  place: Place
): Position {
  if (!tooltipRect) return [-1_000_000, -1_000_000];
  const [x, y] = target;
  const rect = tooltipRect;

  const gap = 10;

  if (place === "left") return [x - rect.width - gap, y - rect.height / 2];

  if (place === "right") return [x + gap, y - rect.height / 2];

  if (place === "bottom") return [x - rect.width / 2, y + gap];

  return [x - rect.width / 2, y - rect.height - gap];
}

export function calcSolidPosition(
  listenerRect: DOMRect | null,
  place: Place
): Position {
  if (!listenerRect) return [-1_000_000, -1_000_000];
  const rect = listenerRect;
  const gap = 5;
  if (place === "left") return [rect.left - gap, rect.top + rect.height / 2];
  if (place === "right") return [rect.right + gap, rect.top + rect.height / 2];
  if (place === "bottom")
    return [rect.left + rect.width / 2, rect.bottom + gap];
  return [rect.left + rect.width / 2, rect.top - gap];
}
