import { css, CSSObject, cx } from "@emotion/css";
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
  return (
    <div className={cx(wrapperClass(place), className)}>
      <div className={cx(placeClass(place, "7px", borderColor), commonClass)} />
      <div
        className={cx(
          placeClass(place, "6px", backgroundColor),
          commonClass,
          css({ position: "absolute" })
        )}
      />
    </div>
  );
};

function placeClass(place: Place, size: string, color: string): string {
  const border: CSSObject = {
    borderTop: `${size} solid transparent`,
    borderBottom: `${size} solid transparent`,
    borderLeft: `${size} solid transparent`,
    borderRight: `${size} solid transparent`,
  };
  if (place === Place.top)
    return css({
      ...border,
      borderTop: `${size} solid ${color}`,
      marginBottom: `-${size}`,
    });
  else if (place === Place.left)
    return css({
      ...border,
      borderLeft: `${size} solid ${color}`,
      marginRight: `-${size}`,
    });
  else if (place === Place.right)
    return css({
      ...border,
      borderRight: `${size} solid ${color}`,
      marginLeft: `-${size}`,
    });
  else
    return css({
      ...border,
      borderBottom: `${size} solid ${color}`,
      marginTop: `-${size}`,
    });
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

const commonClass = css({
  width: "0",
  height: "0",
});
