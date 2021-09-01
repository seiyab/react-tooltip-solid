import { css, CSSInterpolation, CSSObject } from "@emotion/css";

import { place } from "src/position/place";

const border: CSSObject = {
  borderWidth: "8px",
  borderTop: "8px solid transparent",
  borderBottom: "8px solid transparent",
  borderLeft: "8px solid transparent",
  borderRight: "8px solid transparent",
};

const horizontal: CSSObject = {
  marginTop: "-5px",
  top: "50%",
};

const vertical: CSSObject = {
  marginLeft: "-8px",
  left: "50%",
};

const pseudo: CSSObject = {
  content: '""',
  position: "absolute",
};

const before: CSSObject = {
  "&:before": pseudo,
};

const after: CSSObject = {
  "&:after": pseudo,
};

type TooltipClassOption = Required<Pick<CSSObject, "backgroundColor">>;

export function classes({ backgroundColor }: TooltipClassOption) {
  return {
    tooltip: css({
      position: "fixed",
      zIndex: 100,
      borderRadius: "3px",
      display: "inline-block",
      [`&.${place.top}::after`]: {
        color: "red",
      },
      backgroundColor,
    }),
    [place.top]: css(
      {
        "&::after": {
          ...vertical,
          ...border,
          borderTop: `8px solid ${backgroundColor}`,
        },
      },
      after
    ),
    [place.left]: css(
      {
        "&::before": {
          ...horizontal,
          ...border,
          borderLeft: `8px solid ${backgroundColor}`,
        },
      },
      before
    ),
    [place.right]: css(
      {
        "&::after": {
          ...horizontal,
          ...border,
          borderRight: `8px solid ${backgroundColor}`,
        },
      },
      after
    ),
    [place.bottom]: css(
      {
        "&::before": {
          ...vertical,
          ...border,
          borderBottom: `8px solid ${backgroundColor}`,
        },
      },
      before
    ),
  };
}
