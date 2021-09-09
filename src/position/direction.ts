export const Direction = {
  top: "top",
  left: "left",
  bottom: "bottom",
  right: "right",
} as const;
export type Direction = typeof Direction[keyof typeof Direction];
