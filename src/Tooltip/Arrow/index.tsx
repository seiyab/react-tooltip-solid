import { css, cx } from "@emotion/css";
import * as React from "react";

import { Direction } from "src/position/direction";

type Props = {
  className?: string;
  direction: Direction;
  backgroundColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
  borderColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
};

export const Arrow: React.VoidFunctionComponent<Props> = ({
  className,
  direction,
  backgroundColor,
  borderColor,
}) => {
  const { width, height } = rect(direction);
  const bound = css({
    width: `${width}px`,
    height: `${height}px`,
  });
  return (
    <div className={cx(wrapperClass(direction), bound, className)}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill={backgroundColor}
          stroke={borderColor}
          points={points(direction)}
        />
      </svg>
    </div>
  );
};

function rect(direction: Direction): { width: number; height: number } {
  const size = 14;
  if (direction === Direction.top || direction === Direction.bottom)
    return {
      width: size,
      height: size / 2,
    };
  return {
    width: size / 2,
    height: size,
  };
}

function points(direction: Direction): string {
  const { width, height } = rect(direction);
  if (direction === Direction.top)
    return `0,0 ${width / 2},${height} ${width},0`;
  else if (direction === Direction.left)
    return `0,0 ${width},${height / 2} 0,${height}`;
  else if (direction === Direction.right)
    return `${width},0 0,${height / 2} ${width},${height}`;
  else return `0,${height}, ${width / 2},0 ${width},${height}`;
}

function wrapperClass(direction: Direction): string {
  if (direction === Direction.top)
    return css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    });
  else if (direction === Direction.left)
    return css({
      position: "relative",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    });
  else if (direction === Direction.right)
    return css({
      position: "relative",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    });
  else
    return css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    });
}
