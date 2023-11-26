import React from "react";
import { Roulette as Slider } from "../../components/common/sliders";
import styles from "./roulette.module";

const Roulette = ({ isRolling, setRollingEnd, children }) => {
  return (
    <div className={styles.roulette}>
      <div className={styles.inner}>
        {children.length > 0 ? (
          <Slider
            items={children}
            isRolling={isRolling}
            setRollingEnd={setRollingEnd}
          />
        ) : (
          <div className={styles.text}></div>
        )}
        <div className={styles.arrow}>{"<"}</div>
      </div>
    </div>
  );
};

export default Roulette;
