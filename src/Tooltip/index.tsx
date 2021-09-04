import { css, CSSObject, cx } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";
import {
  calcSolidPosition,
  calcStylePosition,
  stylePosition,
} from "src/position";

import { Place } from "src/position/place";
import { TooltipContext } from "src/TooltipContext";
import { Arrow } from "./Arrow";

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

const horizontalWrapper = () =>
  css(
    {
      display: "flex",
      alignItems: "center",
    },
    wrapper
  );

const verticalWrapper = () => css({}, wrapper);

const verticalArrow = () =>
  css({
    marginLeft: "auto",
    marginRight: "auto",
  });

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

  const wrapperClass = do_(() => {
    if (place === Place.top || place === Place.bottom) return verticalWrapper();
    return horizontalWrapper();
  });
  const contentClass = css({
    borderRadius: "3px",
    padding: "8px 12px",
    backgroundColor,
  });

  const position = calcStylePosition(
    do_(() => {
      if (effect === "float") return cursor;
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
        <div className={wrapperClass} style={stylePosition(position)} ref={ref}>
          {do_(() => {
            if (place === Place.right)
              return <Arrow place={place} backgroundColor={backgroundColor} />;
            if (place === Place.bottom)
              return (
                <Arrow
                  className={verticalArrow()}
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
                  className={verticalArrow()}
                  place={place}
                  backgroundColor={backgroundColor}
                />
              );
            if (place === Place.left)
              return <Arrow place={place} backgroundColor={backgroundColor} />;
            return null;
          })}
        </div>
      )}
    </>
  );
};

export default Tooltip;
