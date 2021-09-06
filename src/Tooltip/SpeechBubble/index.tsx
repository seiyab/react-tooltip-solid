import { css, cx } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import { Place } from "src/position/place";
import { Arrow } from "src/Tooltip/Arrow";

type Props = {
  className?: string;
  place: Place;
  backgroundColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
  borderColor: React.CSSProperties["borderColor"];
};

const horizontalWrapper = () =>
  css({
    display: "flex",
    alignItems: "center",
  });

const verticalWrapper = () => css({});

const verticalArrow = {
  marginLeft: "auto",
  marginRight: "auto",
};

const arrowStyle = (place: Place) => {
  if (place === Place.top) return css({ marginTop: "-1px" }, verticalArrow);
  else if (place === Place.left) return css({ marginLeft: "-1px" });
  else if (place === Place.right) return css({ marginRight: "-1px" });
  else return css({ marginBottom: "-1px" }, verticalArrow);
};

const SpeechBubble: React.FunctionComponent<Props> = ({
  className,
  place,
  backgroundColor,
  borderColor = "transparent",
  children,
}) => {
  const wrapperClass = do_(() => {
    if (place === Place.top || place === Place.bottom) return verticalWrapper();
    return horizontalWrapper();
  });
  const contentClass = css({
    borderRadius: "3px",
    padding: "8px 12px",
    backgroundColor,
    borderColor,
    borderWidth: "1px",
    borderStyle: "solid",
  });
  const arrowProps = {
    className: arrowStyle(place),
    place,
    backgroundColor,
    borderColor,
  };

  return (
    <div className={wrapperClass}>
      {do_(() => {
        if (place === Place.right || place === Place.bottom)
          return <Arrow {...arrowProps} />;
        return null;
      })}
      <div className={cx(className, contentClass)}>{children}</div>
      {do_(() => {
        if (place === Place.top || place === Place.left)
          return <Arrow {...arrowProps} />;
        return null;
      })}
    </div>
  );
};

export default SpeechBubble;
