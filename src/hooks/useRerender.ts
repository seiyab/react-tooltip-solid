import * as React from "react";

export function useRerender(): () => void {
  return React.useReducer((x) => x + 1, 0)[1];
}
