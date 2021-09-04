import * as React from "react";

import { TooltipContext } from "src/TooltipContext";
import { useActive } from "./hooks/useActive";

type Props = {
  tooltip: React.ReactChild;
};

const TooltipListener: React.FunctionComponent<Props> = ({
  tooltip,
  children,
}) => {
  const listenerRef = React.useRef<HTMLDivElement>(null);
  const active = useActive(listenerRef.current);
  return (
    <TooltipContext.Provider
      value={{
        listenerRef,
        active,
      }}
    >
      <div ref={listenerRef}>
        {children}
        {tooltip}
      </div>
    </TooltipContext.Provider>
  );
};

export default TooltipListener;
