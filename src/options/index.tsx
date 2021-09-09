export const TooltipEvent = {
  Hover: "hover",
  Click: "click",
} as const;
export type TooltipEvent = typeof TooltipEvent[keyof typeof TooltipEvent];

export const TooltipAt = {
  Cursor: "cursor",
  Listener: "listener",
};
export type TooltipAt = typeof TooltipAt[keyof typeof TooltipAt];
