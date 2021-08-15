import { createUseStyles } from "react-jss";

export type StyleArg = {
  position: {
    left: number;
    top: number;
  };
};

export const useStyles = createUseStyles({
  listener: (_: StyleArg) => ({}),
  tooltip: ({ position }: StyleArg) => ({
    position: "fixed",
    zIndex: 100,
    left: position.left,
    top: position.top,
  }),
});
