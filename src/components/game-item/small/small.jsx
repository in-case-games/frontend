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

  return (
    <div
      className={styles.small_item}
      onClick={() => props.showWindow(props.item)}
      style={{ background: gradientColor }}
    >
      <img
        className={styles.image}
        src={props.item?.image ?? ItemImage}
        alt=""
      />
    </div>
  );
};

export default React.memo(Small);
