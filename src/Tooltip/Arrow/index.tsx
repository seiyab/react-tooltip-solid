import { css, cx } from "@emotion/css";
import * as React from "react";

import { Place } from "src/position/place";

type Props = {
  className?: string;
  place: Place;
  backgroundColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
  borderColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
};

export const Arrow: React.VoidFunctionComponent<Props> = ({
  className,
  place,
  backgroundColor,
  borderColor,
}) => {
  const { width, height } = rect(place);
  const bound = css({
    width: `${width}px`,
    height: `${height}px`,
  });
  return (
    <div className={cx(wrapperClass(place), bound, className)}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill={backgroundColor}
          stroke={borderColor}
          points={points(place)}
        />
      </svg>
    </div>
  );
};

function rect(place: Place): { width: number; height: number } {
  const size = 14;
  if (place === Place.top || place === Place.bottom)
    return {
      width: size,
      height: size / 2,
    };
  return {
    width: size / 2,
    height: size,
  };
}

function points(place: Place): string {
  const { width, height } = rect(place);
  if (place === Place.top) return `0,0 ${width / 2},${height} ${width},0`;
  else if (place === Place.left)
    return `0,0 ${width},${height / 2} 0,${height}`;
  else if (place === Place.right)
    return `${width},0 0,${height / 2} ${width},${height}`;
  else return `0,${height}, ${width / 2},0 ${width},${height}`;
}

function wrapperClass(place: Place): string {
  if (place === Place.top)
    return css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    });
  else if (place === Place.left)
    return css({
      position: "relative",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    });
  else if (place === Place.right)
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
