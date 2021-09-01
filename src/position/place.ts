export const place = {
  top: "top",
  left: "left",
  bottom: "bottom",
  right: "right",
} as const;
export type Place = typeof place[keyof typeof place];
