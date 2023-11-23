import React from "react";
import { TemplateItem as ItemImage } from "../../../../assets/images/main";
import Constants from "../../../../constants";
import styles from "./item.module";

const Item = (props) => {
  const getGradientColor = () =>
    Constants.ItemGradientsNoTransparent[
      props.item.rarity ? props.item.rarity : "white"
    ];

  return (
    <div
      className={styles.item}
      onClick={() => props.goBack()}
      style={{ background: getGradientColor() }}
    >
      <div className={styles.part_left}></div>
      <div className={styles.part_center}>
        <div className={styles.button_back}>{"<"} Назад</div>
        <div className={styles.content}>
          <div className={styles.tittle}>{props.item?.name}</div>
          <img
            alt=""
            className={styles.image}
            src={props.item?.image || ItemImage}
          />
        </div>
      </div>
      <div className={styles.part_right}></div>
    </div>
  );
};

export default Item;
