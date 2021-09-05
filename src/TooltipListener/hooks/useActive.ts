import * as React from "react";

import { TooltipEvent } from "src/options";

type UseActiveOption = {
  event: TooltipEvent;
};

type UseActiveResult = {
  active: boolean;
  handlers: Pick<
    JSX.IntrinsicElements["div"],
    "onMouseEnter" | "onMouseLeave" | "onClick"
  >;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useActive(option: UseActiveOption): UseActiveResult {
  const [active, setActive] = React.useState(false);
  const activate = React.useCallback(() => setActive(true), []);
  const deactivate = React.useCallback(() => setActive(false), []);
  const toggle = React.useCallback(() => setActive((prev) => !prev), []);
  return {
    active,
    handlers: {
      onMouseEnter: option.event === TooltipEvent.Hover ? activate : noop,
      onMouseLeave: option.event === TooltipEvent.Hover ? deactivate : noop,
      onClick: option.event === TooltipEvent.Click ? toggle : noop,
    },
  };
}
