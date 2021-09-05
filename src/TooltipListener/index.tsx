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
  const { active, activate, deactivate } = useActive();
  return (
    <TooltipContext.Provider
      value={{
        listenerRef,
        active,
      }}
    >
      <div ref={listenerRef} onMouseEnter={activate} onMouseLeave={deactivate}>
        {children}
        {tooltip}
      </div>
    </TooltipContext.Provider>
  );
};

export default TooltipListener;
