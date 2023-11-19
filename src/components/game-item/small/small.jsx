import React, { useEffect, useState } from "react";
import { TemplateItem as ItemImage } from "../../../assets/images/main";
import Constants from "../../../constants";
import styles from "./small.module";

const Small = (props) => {
  const [gradientColor, setGradientColor] = useState(
    Constants.ItemGradients[props.item.rarity ? props.item.rarity : "white"]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientColor(
        Constants.ItemGradients[props.item.rarity ? props.item.rarity : "white"]
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  const buttonClick = () => {
    if (props.showWindow) props.showWindow(props.item);
  };

  return (
    <div
      className={styles.small_item}
      onClick={() => buttonClick()}
      style={{ background: gradientColor }}
    >
      <img
        className={styles.image}
        src={props.item?.image ?? ItemImage}
        alt=""
      />
      {props.item?.chanceWining}
    </div>
  );
};

export default React.memo(Small);
