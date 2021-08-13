import { render } from "react-dom";
import * as React from "react";

import { TooltipListener } from "react-tooltip-solid";

const App: React.VoidFunctionComponent = () => {
  return (
    <div>
      <TooltipListener tooltip={<div>Hello</div>}>hover here</TooltipListener>
    </div>
  );
};

const domContainer = document.querySelector("#app");
render(React.createElement(App), domContainer);
