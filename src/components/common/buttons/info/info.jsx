import React from "react";
import styles from "./info.module";

const Info = (props) => {
  return (
    <div
      className={
        props.isActive ? styles.button_info__active : styles.button_info
      }
      onClick={props.click}
    >
      {props.tittle}
    </div>
  );
};

export default Info;
