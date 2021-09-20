import * as React from "react";

import { Direction } from "src/position/direction";
import { Tooltip } from "src";
import { calcAtCursorPosition, calcClientCoordinate } from "src/position";
import { useClientRect } from "src/hooks/useClientRect";
import { useRerender } from "src/hooks/useRerender";

type Props = {
  className?: string;
  direction?: Direction;
  backgroundColor?: React.CSSProperties["backgroundColor"];
  borderColor?: React.CSSProperties["borderColor"];
  color?: React.CSSProperties["color"];
};

const CursorTooltip: React.FunctionComponent<Props> = ({
  direction = Direction.top,
  backgroundColor,
  borderColor,
  color,
  children,
}) => {
  const [rect, ref] = useClientRect<HTMLDivElement>();
  const [cursor, setCursor] = React.useState<[number, number]>([0, 0]);
  React.useEffect(() => {
    const followCursor = (event: DocumentEventMap["mousemove"]) => {
      setCursor([event.clientX, event.clientY]);
    };
    document.body.addEventListener("mousemove", followCursor);
    return () => document.body.removeEventListener("mousemove", followCursor);
  }, []);

  const rerender = useRerender();
  React.useEffect(() => {
    document.addEventListener("scroll", rerender);
    return () => document.removeEventListener("scroll", rerender);
  }, [rerender]);

  const [left, top] = calcClientCoordinate(
    calcAtCursorPosition(cursor, direction),
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

export default CursorTooltip;
