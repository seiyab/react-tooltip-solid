import { css, CSSObject, cx } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import { Place } from "src/position/place";

type Props = {
  className?: string;
  place: Place;
  backgroundColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
};

const commonClass = css({
  width: "0",
  height: "0",
});

export const Arrow: React.VoidFunctionComponent<Props> = ({
  className,
  place,
  backgroundColor,
}) => {
  const placeClass = do_(() => {
    if (place === Place.top)
      return css({
        ...border,
        borderTop: `8px solid ${backgroundColor}`,
      });
    if (place === Place.left)
      return css({
        ...border,
        borderLeft: `8px solid ${backgroundColor}`,
      });
    if (place === Place.right)
      return css({
        ...border,
        borderRight: `8px solid ${backgroundColor}`,
      });
    if (place === Place.bottom)
      return css({
        ...border,
        borderBottom: `8px solid ${backgroundColor}`,
      });
  });
  return <div className={cx(className, placeClass, commonClass)} />;
};

const border: CSSObject = {
  borderTop: "8px solid transparent",
  borderBottom: "8px solid transparent",
  borderLeft: "8px solid transparent",
  borderRight: "8px solid transparent",
};
