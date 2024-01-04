import React from "react";
import styles from "./statistics.module";

const Statistic = (props) => (
  <div className={styles.statistic}>
    <img className={styles.image} alt="" src={props.image} />
    <div className={styles.number}>{props.number}</div>
    <div className={styles.tittle}>{props.tittle}</div>
  </div>
);

export default React.memo(Statistic);
