import { Direction } from "src/position/direction";

export type Position = [number, number];

export function calcClientCoordinate(
  target: Position,
  tooltipRect: DOMRect | null,
  direction: Direction
): Position {
  if (!tooltipRect) return [-1_000_000, -1_000_000];
  const [x, y] = target;
  const rect = tooltipRect;

  const gap = 5;

  if (direction === Direction.left)
    return [x - rect.width - gap, y - rect.height / 2];
  else if (direction === Direction.right) return [x + gap, y - rect.height / 2];
  else if (direction === Direction.bottom) return [x - rect.width / 2, y + gap];
  else return [x - rect.width / 2, y - rect.height - gap];
}

export function calcAtCursorPosition(
  cursor: Position,
  direction: Direction
): Position {
  const [x, y] = cursor;
  if (direction === Direction.top) return [x, y - 2];
  else if (direction === Direction.right) return [x + 5, y];
  else if (direction === Direction.left) return [x - 2, y];
  else return [x, y + 15]; // bottom
}

export function calcAtListenerPosition(
  listenerRect: DOMRect | null,
  direction: Direction
): Position {
  if (!listenerRect) return [-1_000_000, -1_000_000];
  const rect = listenerRect;
  const gap = 0;
  if (direction === "left")
    return [rect.left - gap, rect.top + rect.height / 2];
  if (direction === "right")
    return [rect.right + gap, rect.top + rect.height / 2];
  if (direction === "bottom")
    return [rect.left + rect.width / 2, rect.bottom + gap];
  return [rect.left + rect.width / 2, rect.top - gap];
}
