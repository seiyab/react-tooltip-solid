import * as React from "react";
import { TooltipEvent } from "src/options";

import { TooltipContext } from "src/TooltipContext";
import { useActive } from "./hooks/useActive";

type Props = {
  tooltip: React.ReactChild;
  event?: TooltipEvent;
};

const TooltipListener: React.FunctionComponent<Props> = ({
  tooltip,
  event = TooltipEvent.Hover,
  children,
}) => {
  const listenerRef = React.useRef<HTMLDivElement>(null);
  const { active, handlers } = useActive({ event });
  return (
    <TooltipContext.Provider
      value={{
        listenerRef,
        active,
      }}
    >
      <div ref={listenerRef} {...handlers}>
        {children}
        {tooltip}
      </div>
    </TooltipContext.Provider>
  );
};

export default TooltipListener;
