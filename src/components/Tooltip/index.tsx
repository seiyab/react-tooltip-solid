import { css, CSSObject } from "@emotion/css";
import * as React from "react";

import { Direction } from "src/position/direction";
import SpeechBubble from "src/components/SpeechBubble";

type Props = {
  className?: string;
  direction?: Direction;
  backgroundColor?: React.CSSProperties["backgroundColor"];
  borderColor?: React.CSSProperties["borderColor"];
  color?: React.CSSProperties["color"];
  top: Required<React.CSSProperties>["top"];
  left: Required<React.CSSProperties>["left"];
};

const wrapper: CSSObject = {
  position: "fixed",
  zIndex: 999,
};

const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(
  (
    {
      className,
      direction = Direction.top,
      backgroundColor = "white",
      borderColor,
      color,
      top,
      left,
      children,
    },
    ref
  ) => {
    const stopPropagation = React.useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      []
    );

    return (
      <div
        className={css(wrapper)}
        style={{ top, left }}
        ref={ref}
        onClick={stopPropagation}
      >
        <SpeechBubble
          className={className}
          direction={direction}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          color={color}
        >
          {children}
        </SpeechBubble>
      </div>
    );
  }
);

export default Tooltip;
