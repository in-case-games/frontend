import React from "react";
import styles from "./strip-counter-slider.module";

const StripCounterSlider = (props) => (
  <div className={styles.strip_counter_slider}>
    <input
      id={styles.slider}
      type="range"
      value={props.value()}
      min={props.min || 0}
      max={props.max || 10}
      orient="vertical"
      step={props.step || 1}
      onChange={(e) => props.onChange(e.target.value)}
      onWheel={(e) => {
        const num = Number(e.target.value);

        if (e.deltaY > props.min && props.value() > props.min)
          props.onChange(num - 1);
        else if (e.deltaY < props.min && props.value() < props.max)
          props.onChange(num + 1);
      }}
    />
  </div>
);

export default React.memo(StripCounterSlider);
