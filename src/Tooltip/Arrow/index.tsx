import { css, CSSObject, cx } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import { Place } from "src/position/place";

type Props = {
  className?: string;
  place: Place;
  backgroundColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
};

export const Arrow: React.VoidFunctionComponent<Props> = ({
  className,
  place,
  backgroundColor,
}) => {
  const placeClass = do_(() => {
    if (place === Place.top)
      return css({
        ...border,
        borderTop: `${width} solid ${backgroundColor}`,
        marginBottom: `-${width}`,
      });
    if (place === Place.left)
      return css({
        ...border,
        borderLeft: `${width} solid ${backgroundColor}`,
        marginRight: `-${width}`,
      });
    if (place === Place.right)
      return css({
        ...border,
        borderRight: `${width} solid ${backgroundColor}`,
        marginLeft: `-${width}`,
      });
    if (place === Place.bottom)
      return css({
        ...border,
        borderBottom: `${width} solid ${backgroundColor}`,
        marginTop: `-${width}`,
      });
  });
  return <div className={cx(className, placeClass, commonClass)} />;
};

const width = "8px";

const commonClass = css({
  width: "0",
  height: "0",
});

const border: CSSObject = {
  borderTop: `${width} solid transparent`,
  borderBottom: `${width} solid transparent`,
  borderLeft: `${width} solid transparent`,
  borderRight: `${width} solid transparent`,
};
