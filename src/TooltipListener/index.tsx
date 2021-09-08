import * as React from "react";
import { TooltipEvent } from "src/options";

import { TooltipContext } from "src/TooltipContext";
import { useActive } from "./hooks/useActive";

type Props = {
  className?: string;
  tooltip: React.ReactChild;
  event?: TooltipEvent;
};

const TooltipListener: React.FunctionComponent<Props> = ({
  className,
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
      <div ref={listenerRef} className={className} {...handlers}>
        {children}
        {tooltip}
      </div>
    </TooltipContext.Provider>
  );
};

export default TooltipListener;
