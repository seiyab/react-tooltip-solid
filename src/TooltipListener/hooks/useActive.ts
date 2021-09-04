import * as React from "react";

export function useActive(listener: HTMLDivElement | null): boolean {
  const [active, setActive] = React.useState(true);
  React.useEffect(() => {
    const updateActive = () => {
      setActive(listener?.matches(":hover") ?? false);
    };
    document.addEventListener("mousemove", updateActive);
    return () => document.removeEventListener("mousemove", updateActive);
  }, [listener]);

  return active;
}
