import * as React from "react";

import { Direction } from "src/position/direction";
import { Tooltip } from "src";
import { calcAtListenerPosition, calcClientCoordinate } from "src/position";
import { useClientRect } from "src/hooks/useClientRect";
import { useRerender } from "src/hooks/useRerender";

type Props = {
  className?: string;
  direction?: Direction;
  target: React.RefObject<HTMLElement>;
  backgroundColor?: React.CSSProperties["backgroundColor"];
  borderColor?: React.CSSProperties["borderColor"];
  color?: React.CSSProperties["color"];
};

const ElementTooltip: React.FunctionComponent<Props> = ({
  direction = Direction.top,
  target,
  backgroundColor,
  borderColor,
  color,
  children,
}) => {
  const [rect, ref] = useClientRect<HTMLDivElement>();
  const rerender = useRerender();
  React.useEffect(() => {
    document.addEventListener("scroll", rerender);
    return () => document.removeEventListener("scroll", rerender);
  }, [rerender]);

  const [left, top] = calcClientCoordinate(
    calcAtListenerPosition(
      target.current?.getBoundingClientRect() ?? null,
      direction
    ),
    rect,
    direction
  );
  return (
    <Tooltip
      ref={ref}
      direction={direction}
      top={`${top}px`}
      left={`${left}px`}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
    >
      {children}
    </Tooltip>
  );
};

export default ElementTooltip;
