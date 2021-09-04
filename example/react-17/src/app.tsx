import { render } from "react-dom";
import * as React from "react";

import { Tooltip, TooltipListener } from "react-tooltip-solid";

import styles from "./app.module.css";

const ps = ["top", "left", "right", "bottom"] as const;

const App: React.VoidFunctionComponent = () => {
  return (
    <div>
      <TooltipListener
        tooltip={
          <Tooltip className={styles.tooltip} backgroundColor="red">
            Hello
          </Tooltip>
        }
      >
        hover here
      </TooltipListener>
      <div className={styles.right}>
        <TooltipListener
          tooltip={
            <Tooltip className={styles.tooltip} backgroundColor="red">
              Hello
            </Tooltip>
          }
        >
          hover here
        </TooltipListener>
      </div>
      <div className={styles.grid}>
        {new Array(10).fill(null).map((_, i) => (
          <TooltipListener
            key={i}
            tooltip={
              <Tooltip
                place={ps[i % 4]}
                backgroundColor="black"
                className={styles.tooltip}
              >
                Hello
              </Tooltip>
            }
          >
            hover here
          </TooltipListener>
        ))}
      </div>
    </div>
  );
};

const domContainer = document.querySelector("#app");
render(React.createElement(App), domContainer);
