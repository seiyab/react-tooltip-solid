import classNames from "classnames";
import * as React from "react";

import styles from "styles.module.css";

type Props<T extends string> = {
  className?: string;
  value: T;
  onSelect: (v: T) => void;
  items: Readonly<
    {
      value: T;
      label: string;
    }[]
  >;
};

export const ButtonGroup = <T extends string>({
  className,
  value,
  onSelect,
  items,
}: Props<T>): React.ReactElement => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.buttonGroup}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            className={classNames(styles.buttonItem, {
              [styles.buttonItemSelected]: value === item.value,
            })}
            onClick={() => onSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
