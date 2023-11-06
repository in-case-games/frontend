import React from "react";
import { Converter } from "../../../helpers/converter";
import styles from "./promocode.module";

const Promocode = (props) => {
  const getColor = () => (props.history.isActivated ? "green" : "yellow");

  return (
    <div className={styles.history} onClick={props.click}>
      <div
        className={styles.history_content}
        style={{ borderColor: getColor() }}
      >
        <div className={styles.discount}>
          {props.history.discount}
          <div className={styles.percent}>%</div>
        </div>
        <div className={styles.name}>
          {Converter.cutString(props.history.name, 25)}
        </div>
        <div className={styles.date}>
          {Converter.getMiniDate(props.history.date)}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Promocode);
