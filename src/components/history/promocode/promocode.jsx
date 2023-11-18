import React from "react";
import { Converter } from "../../../helpers/converter";
import styles from "./promocode.module";

const Promocode = (props) => {
  const getColor = () => (props.promocode?.isActivated ? "green" : "yellow");

  return (
    <div className={styles.history} onClick={props.click}>
      <div
        className={styles.history_content}
        style={{ borderColor: getColor() }}
      >
        <div className={styles.discount}>
          {props.promocode?.discount ? props.promocode?.discount : null}
          <div className={styles.percent}>
            {props.promocode?.discount ? "%" : "+"}
          </div>
        </div>
        <div className={styles.name}>
          {props.promocode?.name
            ? Converter.cutString(props.promocode?.name, 25)
            : null}
        </div>
        <div className={styles.date}>
          {props.promocode?.date
            ? Converter.getMiniDate(props.promocode.date)
            : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Promocode);
