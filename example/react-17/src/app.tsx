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

const effects = [
  { value: "float", label: "Float" },
  { value: "solid", label: "Solid" },
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
  const [event, setEvent] = React.useState<"click" | "hover">("hover");
  const [place, setPlace] = React.useState<Place>("top");
  const [effect, setEffect] = React.useState<"float" | "solid">("float");
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [borderColor, setBorderColor] = React.useState("transparent");
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
                  effect={effect}
                  backgroundColor={backgroundColor}
                  borderColor={borderColor}
                >
                  Hello
                </Tooltip>
              }
            >
              <span>
                {events.find(({ value }) => value === event)?.label} here
              </span>
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
            <div className={styles.controlSwitch}>
              <span>Effect:</span>
              <ButtonGroup<"float" | "solid">
                className={styles.switch}
                value={effect}
                onSelect={setEffect}
                items={effects}
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
