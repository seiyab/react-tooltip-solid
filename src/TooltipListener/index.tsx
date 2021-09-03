import * as React from "react";

import { useTooltip } from "src/hooks/useTooltip";
import { Tooltip } from "src/Tooltip";

type Props = {
  effect?: "float" | "solid";
  place?: "top" | "left" | "bottom" | "right";
  backgroundColor?: React.CSSProperties["backgroundColor"];
  tooltip: React.ReactChild;
};

const TooltipListener: React.FunctionComponent<Props> = ({
  effect = "float",
  place = "top",
  backgroundColor = "white",
  tooltip,
  children,
}) => {
  const { active, listenerProps, tooltipProps } = useTooltip({
    effect,
    place,
    backgroundColor,
  });
  return (
    <>
      <div {...listenerProps}>{children}</div>
      {active && (
        <div {...tooltipProps}>
          <Tooltip place={place} backgroundColor={backgroundColor}>
            {tooltip}
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default TooltipListener;
