import React from "react";
import { TemplateBox as BoxImage } from "../../../assets/images/main";
import styles from "./small.module";

const Small = (props) => {
  return (
    <div
      className={styles.box_small}
      onClick={() => props.showWindow(props.box)}
    >
      <img className={styles.image} src={props.box?.image ?? BoxImage} alt="" />
    </div>
  );
};

export default React.memo(Small);
