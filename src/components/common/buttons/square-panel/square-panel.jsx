import React from "react";
import styles from "./square-panel.module";

const SquarePanel = (props) => {
  return (
    <div className={styles.square_panel} onClick={() => props.click()}>
      <img alt="" className={styles.image} src={props.image} />
    </div>
  );
};

export default SquarePanel;
