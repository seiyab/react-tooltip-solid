import { css, CSSObject } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";
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
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const context = React.useContext(TooltipContext);
  const [cursor, setCursor] = React.useState<[number, number]>([0, 0]);
  React.useEffect(() => {
    const followCursor = (event: DocumentEventMap["mousemove"]) => {
      if (context.active) {
        setCursor([event.clientX, event.clientY]);
      }
    };
    document.addEventListener("mousemove", followCursor);
    return () => document.removeEventListener("mousemove", followCursor);
  });

  const position = calcStylePosition(
    do_(() => {
      if (effect === "float") return calcFloatPosition(cursor, place);
      return calcSolidPosition(
        context.listenerRef.current?.getBoundingClientRect() ?? null,
        place
      );
    }),
    ref.current?.getBoundingClientRect() ?? null,
    place
  );
  return (
    <>
      {context.active && (
        <div className={css(wrapper)} style={stylePosition(position)} ref={ref}>
          <SpeechBubble
            className={className}
            place={place}
            backgroundColor={backgroundColor}
          >
            {children}
          </SpeechBubble>
        </div>
      )}
    </>
  );
};

export default Tooltip;
