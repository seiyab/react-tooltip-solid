import * as React from "react";

type Props = {
  tooltip: React.ReactChild;
};

const TooltipListener: React.FunctionComponent<Props> = ({
  tooltip,
  children,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const closeTooltip = () => setShowTooltip(false);
  const openTooltip = () => setShowTooltip(true);
  return (
    <div
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
      style={{
        position: "relative",
      }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default TooltipListener;
