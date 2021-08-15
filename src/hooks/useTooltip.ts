import { do_ } from "@seiyab/do-expr";
import * as React from "react";

import { StyleArg, useStyles } from "src/hooks/useStyles";

type UseTooltipOption = {
  effect: "float" | "solid";
  place: "top" | "left" | "bottom" | "right";
};

type UseTooltipResult<Elem extends HTMLDivElement> = {
  active: boolean;
  listenerProps: Required<
    // Pick<React.DOMAttributes<Elem>, "onMouseEnter" | "onMouseLeave"> & {
    Pick<React.DOMAttributes<Elem>, never> & {
      className: string;
      ref: React.RefObject<Elem>;
    }
  >;
  tooltipProps: {
    className: string;
    ref: React.RefObject<Elem>;
  };
};

export function useTooltip<Elem extends HTMLDivElement>(
  option: UseTooltipOption
): UseTooltipResult<Elem> {
  const [active, setActive] = React.useState(false);
  const [cursor, setCursor] = React.useState<[number, number]>([0, 0]);

  const listenerRef = React.useRef<Elem>(null);
  const tooltipRef = React.useRef<Elem>(null);

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

  const position = calcStylePosition(cursor, tooltipRef.current, option.place);

  const classes = useStyles({ position });
  return {
    active,
    listenerProps: {
      ref: listenerRef,
      className: classes.listener,
    },
    tooltipProps: {
      ref: tooltipRef,
      className: classes.tooltip,
    },
  };
}

function calcStylePosition<Elem extends HTMLDivElement>(
  target: [number, number],
  tooltipElem: Elem | null,
  place: UseTooltipOption["place"]
): StyleArg["position"] {
  if (!tooltipElem)
    return {
      left: -1_000_000,
      top: -1_000_000,
    };
  const [x, y] = target;
  const rect = tooltipElem.getBoundingClientRect();

  const gap = 10;

  if (place === "left")
    return {
      left: x - rect.width - gap,
      top: y - rect.height / 2,
    };

  if (place === "right")
    return {
      left: x + gap,
      top: y - rect.height / 2,
    };

  if (place === "bottom")
    return {
      left: x - rect.width / 2,
      top: y + gap,
    };

  return {
    left: x - rect.width / 2,
    top: y - rect.height - gap,
  };
}
