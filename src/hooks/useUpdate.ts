import * as React from "react";

export function useUpdate(): () => void {
  const [_, setState] = React.useState({});
  return React.useCallback(() => setState({}), []);
}
