import * as React from "react";

import { Direction } from "src/position/direction";
import { ElementTooltip } from "src";

type Props = {
  tooltipContent: React.ReactNode;
  direction?: Direction;
  event?: "hover" | "click";
  backgroundColor?: React.CSSProperties["backgroundColor"];
  borderColor?: React.CSSProperties["borderColor"];
  color?: React.CSSProperties["color"];
};

const noop: VoidFunction = () => null;

const AddTooltip: React.FunctionComponent<Props> = ({
  tooltipContent,
  direction,
  event = "hover",
  backgroundColor,
  borderColor,
  color,
  children,
}) => {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const toggle = React.useCallback(() => setActive((prev) => !prev), []);
  const activate = React.useCallback(() => setActive(true), []);
  const deactivate = React.useCallback(() => setActive(false), []);
  const onClick = event === "click" ? toggle : noop;
  const onMouseEnter = event === "hover" ? activate : noop;
  const onMouseLeave = event === "hover" ? deactivate : noop;
  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
      {active && (
        <ElementTooltip
          target={ref}
          direction={direction}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          color={color}
        >
          {tooltipContent}
        </ElementTooltip>
      )}
    </>
  );
};

export default AddTooltip;
