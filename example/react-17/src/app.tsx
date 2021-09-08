import { render } from "react-dom";
import * as React from "react";

import { Tooltip, TooltipListener } from "react-tooltip-solid";

import styles from "./app.module.css";
import { ButtonGroup } from "./ButtonGroup";

const places = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
] as const;
type Place = typeof places[number]["value"];

const events = [
  { value: "hover", label: "Hover" },
  { value: "click", label: "Click" },
] as const;

const App: React.VoidFunctionComponent = () => {
  const [event, setEvent] = React.useState<"click" | "hover">("hover");
  const [place, setPlace] = React.useState<Place>("top");
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Tooltip Example</h1>
        <section>
          <div className={styles.displayContainer}>
            <TooltipListener
              event={event}
              className={styles.dynamicDisplay}
              tooltip={
                <Tooltip
                  className={styles.tooltip}
                  place={place}
                  backgroundColor="black"
                >
                  Hello
                </Tooltip>
              }
            >
              <span>Hover here</span>
            </TooltipListener>
          </div>
          <div className={styles.controls}>
            <div className={styles.controlSwitch}>
              <span>Event:</span>
              <ButtonGroup<"click" | "hover">
                className={styles.switch}
                value={event}
                onSelect={setEvent}
                items={events}
              />
            </div>
            <div className={styles.controlSwitch}>
              <span>Place:</span>
              <ButtonGroup<Place>
                className={styles.switch}
                value={place}
                onSelect={setPlace}
                items={places}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const domContainer = document.querySelector("#app");
render(React.createElement(App), domContainer);
