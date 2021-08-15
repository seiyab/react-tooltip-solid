import * as React from "react";

import { useTooltip } from "src/hooks/useTooltip";

type Props = {
  effect?: "float" | "solid";
  place?: "top" | "left" | "bottom" | "right";
  tooltip: React.ReactChild;
};

const TooltipListener: React.FunctionComponent<Props> = ({
  effect = "float",
  place = "top",
  tooltip,
  children,
}) => {
  const { active, listenerProps, tooltipProps } = useTooltip({
    effect,
    place,
  });
  return (
    <>
      <div {...listenerProps}>{children}</div>
      {active && <div {...tooltipProps}>{tooltip}</div>}
    </>
  );
};

export default TooltipListener;
