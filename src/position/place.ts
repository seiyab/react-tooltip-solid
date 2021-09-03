export const Place = {
  top: "top",
  left: "left",
  bottom: "bottom",
  right: "right",
} as const;
export type Place = typeof Place[keyof typeof Place];
