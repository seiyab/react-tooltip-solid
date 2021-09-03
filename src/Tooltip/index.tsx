import { css, cx } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import { Place } from "src/position/place";
import { Arrow } from "./Arrow";

type Props = {
  className?: string;
  place: Place;
  backgroundColor: string;
};

const horizontalWrapper = css({
  display: "flex",
  alignItems: "center",
});

const verticalWrapper = css({});

const verticalArrow = css({
  marginLeft: "auto",
  marginRight: "auto",
});

export const Tooltip: React.FunctionComponent<Props> = ({
  className,
  place,
  backgroundColor,
  children,
}) => {
  const wrapperClass = do_(() => {
    if (place === Place.top || place === Place.bottom) return verticalWrapper;
    return horizontalWrapper;
  });
  const contentClass = css({
    borderRadius: "3px",
    padding: "8px 12px",
    backgroundColor,
  });
  return (
    <div className={wrapperClass}>
      {do_(() => {
        if (place === Place.right)
          return <Arrow place={place} backgroundColor={backgroundColor} />;
        if (place === Place.bottom)
          return (
            <Arrow
              className={verticalArrow}
              place={place}
              backgroundColor={backgroundColor}
            />
          );
        return null;
      })}
      <div className={cx(className, contentClass)}>{children}</div>
      {do_(() => {
        if (place === Place.top)
          return (
            <Arrow
              className={verticalArrow}
              place={place}
              backgroundColor={backgroundColor}
            />
          );
        if (place === Place.left)
          return <Arrow place={place} backgroundColor={backgroundColor} />;
        return null;
      })}
    </div>
  );
};
