import React from "react";
import { TemplateBox as BoxImage } from "../../../../assets/images/main";
import Constants from "../../../../constants";
import { AirplaneBlack, InCoinGray } from "../../../../assets/images/icons";
import { Converter } from "../../../../helpers/converter";
import styles from "./box.module";

const Box = (props) => {
  return (
    <div
      className={styles.box}
      style={{ background: Constants.ItemGradientsNoTransparent["gold"] }}
    >
      <div className={styles.part_top}></div>
      <div className={styles.part_left}></div>
      <div className={styles.part_left__border}></div>
      <div className={styles.part_right}></div>
      <div className={styles.part_right__border}></div>
      <div className={styles.part_center}>
        <div className={styles.button_back} onClick={() => {}}>
          {"<"} Назад
        </div>
        <div className={styles.content}>
          <div className={styles.tittle}>{props.box?.name}</div>
          <img
            alt=""
            className={styles.image}
            src={props.box?.image || BoxImage}
          />
        </div>
      </div>
      <div className={styles.part_bottom}>
        <div className={styles.button_sell} onClick={() => {}}>
          {props.box?.cost ? Converter.cutCost(props.box?.cost) : null}
          <img className={styles.image} alt="" src={InCoinGray} />
        </div>
        <div className={styles.button_send} onClick={() => {}}>
          <img className={styles.image} alt="" src={AirplaneBlack} />
        </div>
      </div>
    </div>
  );
};

export default Box;
