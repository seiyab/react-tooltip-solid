import { css, CSSObject } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";
import { useClientRect } from "src/hooks/useClientRect";
import { useRerender } from "src/hooks/useRerender";
import {
  calcFloatPosition,
  calcSolidPosition,
  calcStylePosition,
  stylePosition,
} from "src/position";

import { Place } from "src/position/place";
import { TooltipContext } from "src/TooltipContext";
import SpeechBubble from "./SpeechBubble";

type Props = {
  className?: string;
  effect?: "float" | "solid";
  place?: Place;
  backgroundColor?: React.CSSProperties["backgroundColor"];
  borderColor?: React.CSSProperties["borderColor"];
};

const wrapper: CSSObject = {
  position: "fixed",
  zIndex: 999,
};

const Tooltip: React.FunctionComponent<Props> = ({
  className,
  effect = "float",
  place = Place.top,
  backgroundColor = "white",
  borderColor,
  children,
}) => {
  const [rect, ref] = useClientRect<HTMLDivElement>();
  const context = React.useContext(TooltipContext);
  const [cursor, setCursor] = React.useState<[number, number]>([0, 0]);
  React.useEffect(() => {
    const followCursor = (event: DocumentEventMap["mousemove"]) => {
      setCursor([event.clientX, event.clientY]);
    };
    document.body.addEventListener("mousemove", followCursor);
    return () => document.body.removeEventListener("mousemove", followCursor);
  }, []);
  const stopPropagation = React.useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );
  const rerender = useRerender();
  React.useEffect(() => {
    document.addEventListener("scroll", rerender);
    return () => document.removeEventListener("scroll", rerender);
  }, [rerender]);

  const position = calcStylePosition(
    do_(() => {
      if (effect === "float") return calcFloatPosition(cursor, place);
      return calcSolidPosition(
        context.listenerRef.current?.getBoundingClientRect() ?? null,
        place
      );
    }),
    rect,
    place
  );
  return (
    <>
      {context.active && (
        <div
          className={css(wrapper)}
          style={stylePosition(position)}
          ref={ref}
          onClick={stopPropagation}
        >
          <SpeechBubble
            className={className}
            place={place}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
          >
            {children}
          </SpeechBubble>
        </div>
      )}
    </>
  );
};

export default Tooltip;
