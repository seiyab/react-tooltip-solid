export const TooltipEvent = {
  Hover: "hover",
  Click: "click",
} as const;
export type TooltipEvent = typeof TooltipEvent[keyof typeof TooltipEvent];
