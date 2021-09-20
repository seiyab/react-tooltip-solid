import { css, cx } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import { Direction } from "src/position/direction";
import { Arrow } from "src/components/Arrow";

type Props = {
  className?: string;
  direction: Direction;
  backgroundColor: Exclude<React.CSSProperties["backgroundColor"], undefined>;
  borderColor: React.CSSProperties["borderColor"];
  color: React.CSSProperties["color"];
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

const arrowStyle = (direction: Direction) => {
  if (direction === Direction.top)
    return css({ marginTop: "-1px" }, verticalArrow);
  else if (direction === Direction.left) return css({ marginLeft: "-1px" });
  else if (direction === Direction.right) return css({ marginRight: "-1px" });
  else return css({ marginBottom: "-1px" }, verticalArrow);
};

const SpeechBubble: React.FunctionComponent<Props> = ({
  className,
  direction,
  backgroundColor,
  borderColor = "transparent",
  color,
  children,
}) => {
  const wrapperClass = do_(() => {
    if (direction === Direction.top || direction === Direction.bottom)
      return verticalWrapper();
    return horizontalWrapper();
  });
  const contentClass = css({
    borderRadius: "3px",
    padding: "8px 12px",
    backgroundColor,
    borderColor,
    color,
    borderWidth: "1px",
    borderStyle: "solid",
  });
  const arrowProps = {
    className: arrowStyle(direction),
    direction,
    backgroundColor,
    borderColor,
  };

  return (
    <div className={wrapperClass}>
      {do_(() => {
        if (direction === Direction.right || direction === Direction.bottom)
          return <Arrow {...arrowProps} />;
        return null;
      })}
      <div className={cx(className, contentClass)}>{children}</div>
      {do_(() => {
        if (direction === Direction.top || direction === Direction.left)
          return <Arrow {...arrowProps} />;
        return null;
      })}
    </div>
  );
};

export default SpeechBubble;
