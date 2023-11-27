import React, { useState } from "react";
import { TemplateBox as BoxImage } from "../../../../assets/images/main";
import Constants from "../../../../constants";
import { FlagBlack as Flag } from "../../../../assets/images/icons";
import styles from "./box.module";

const Box = (props) => {
  const [hovered, setHovered] = useState(false);

  const getBackground = () => {
    if (props.isHasBanner) return hovered ? "#ffed94" : "#ffe665";
    else return hovered ? "#d3d3d3" : "#b8b8b8";
  };

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
        <div
          className={styles.button_banner}
          onClick={props.openBannerWindow}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ background: getBackground() }}
        >
          <img className={styles.image} alt="" src={Flag} />
        </div>
      </div>
    </div>
  );
};

export default Box;
