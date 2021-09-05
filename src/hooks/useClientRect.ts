import * as React from "react";

export function useClientRect<T extends HTMLElement>(): [
  DOMRect | null,
  (node: T) => void
] {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const ref = React.useCallback((node: T | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
