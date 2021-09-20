import { render } from "react-dom";
import * as React from "react";

import { AddTooltip, ElementTooltip } from "react-tooltip-solid";

import styles from "./app.module.css";
import { ButtonGroup } from "./ButtonGroup";

const directions = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
] as const;
type Direction = typeof directions[number]["value"];

const events = [
  { value: "hover", label: "Hover" },
  { value: "click", label: "Click" },
] as const;

const backgroundColors = [
  { value: "black", label: "Black" },
  { value: "darkgreen", label: "Darkgreen" },
  { value: "darkblue", label: "Darkblue" },
] as const;

const borderColors = [
  { value: "transparent", label: "Transparent" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
] as const;

const App: React.VoidFunctionComponent = () => {
  // const [event, setEvent] = React.useState<"click" | "hover">("hover");
  const [event, setEvent] = React.useState<"click" | "hover">("click");
  const [direction, setDirection] = React.useState<Direction>("top");
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [borderColor, setBorderColor] = React.useState("transparent");
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Tooltip Example</h1>
        <section>
          <div className={styles.displayContainer}>
            <AddTooltip
              event={event}
              direction={direction}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              color="white"
              tooltipContent="Hello"
            >
              <div className={styles.dynamicDisplay}>
                {events.find(({ value }) => value === event)?.label} here
              </div>
            </AddTooltip>
          </div>
          <div className={styles.controls}>
            <div className={styles.controlSwitch}>
              <span>Event:</span>
              <ButtonGroup
                className={styles.switch}
                value={event}
                onSelect={setEvent}
                items={events}
              />
            </div>
            <div className={styles.controlSwitch}>
              <span>Direction:</span>
              <ButtonGroup
                className={styles.switch}
                value={direction}
                onSelect={setDirection}
                items={directions}
              />
            </div>
            <div className={styles.controlSwitch}>
              <span>Background Color:</span>
              <ButtonGroup
                className={styles.switch}
                value={backgroundColor}
                onSelect={setBackgroundColor}
                items={backgroundColors}
              />
            </div>
            <div className={styles.controlSwitch}>
              <span>Border Color:</span>
              <ButtonGroup
                className={styles.switch}
                value={borderColor}
                onSelect={setBorderColor}
                items={borderColors}
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
