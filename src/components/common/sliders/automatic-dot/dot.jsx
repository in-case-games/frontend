import React from "react";
import styles from "./automatic-dot.module";

const Dot = (props) => (
  <div className={props.isActive ? styles.dot__active : styles.dot}></div>
);

export default React.memo(Dot);
