import React from "react";
import { TemplateBox as BoxImage } from "../../../assets/images/main";
import { InCoin } from "../../../assets/images/icons";
import { Converter } from "../../../helpers/converter";
import styles from "./simple.module";

const Simple = (props) => {
  return (
    <div className={styles.box_simple} onClick={() => props.showBox(props.box)}>
      <img
        alt=""
        src={props.box?.image ?? BoxImage}
        className={styles.box_image}
        style={{ background: "gray" }}
      />
      <div className={styles.box_info}>
        <div className={styles.name}>
          {Converter.cutString(props.box?.name || "", 12)}
        </div>
        <div className={styles.cost}>
          {props.box?.cost ? Converter.cutCost(props.box?.cost) : "Пустой"}
          <img alt="" src={InCoin} className={styles.image} />
        </div>
        <div className={styles.game}>{props.box?.game}</div>
      </div>
    </div>
  );
};

export default React.memo(Simple);
