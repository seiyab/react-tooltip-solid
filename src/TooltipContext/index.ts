import * as React from "react";

type TooltipContextValue = {
  listenerRef: React.RefObject<HTMLDivElement>;
  active: boolean;
};

export const TooltipContext = React.createContext<TooltipContextValue>({
  listenerRef: { current: null },
  active: false,
});
