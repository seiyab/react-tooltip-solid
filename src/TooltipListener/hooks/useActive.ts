import * as React from "react";

type UseActiveResult = {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
};

export function useActive(): UseActiveResult {
  const [active, setActive] = React.useState(false);
  return {
    active,
    activate: React.useCallback(() => setActive(true), []),
    deactivate: React.useCallback(() => setActive(false), []),
  };
}
