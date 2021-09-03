import { css } from "@emotion/css";
import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import {
  calcSolidPosition,
  calcStylePosition,
  stylePosition,
} from "src/position";
import { Place } from "src/position/place";

type UseTooltipOption = {
  effect: "float" | "solid";
  place: Place;
  backgroundColor: Required<React.CSSProperties>["backgroundColor"];
};

type UseTooltipResult = {
  active: boolean;
  listenerProps: Required<Pick<JSX.IntrinsicElements["div"], "ref">>;
  tooltipProps: Required<
    Pick<JSX.IntrinsicElements["div"], "style" | "className" | "ref">
  >;
};

export function useTooltip(option: UseTooltipOption): UseTooltipResult {
  const [active, setActive] = React.useState(false);
  const [cursor, setCursor] = React.useState<[number, number]>([0, 0]);

  const listenerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const followCursor = (event: DocumentEventMap["mousemove"]) => {
      if (active) {
        setCursor([event.clientX, event.clientY]);
      }
    };
    const updateActive = () => {
      if (!tooltipRef.current?.matches(":hover")) {
        setActive(listenerRef.current?.matches(":hover") ?? false);
      }
    };
    const onMousemove = (event: DocumentEventMap["mousemove"]) => {
      followCursor(event);
      updateActive();
    };
    document.addEventListener("mousemove", onMousemove);
    return () => document.removeEventListener("mousemove", onMousemove);
  });

  const position = calcStylePosition(
    do_(() => {
      if (option.effect === "float") return cursor;
      return calcSolidPosition(listenerRef.current, option.place);
    }),
    tooltipRef.current,
    option.place
  );

  return {
    active,
    listenerProps: {
      ref: listenerRef,
    },
    tooltipProps: {
      ref: tooltipRef,
      className: css({
        zIndex: 999,
        position: "fixed",
      }),
      style: stylePosition(position),
    },
  };
}
