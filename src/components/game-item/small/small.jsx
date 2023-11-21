import React, { useEffect, useState } from "react";
import { TemplateItem as ItemImage } from "../../../assets/images/main";
import Constants from "../../../constants";
import styles from "./small.module";

const Small = (props) => {
  const [gradientColor, setGradientColor] = useState(
    Constants.ItemGradients[props.item.rarity ? props.item.rarity : "white"]
  );
  const [showChances, setShowChances] = useState(false);

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
      style={{
        background: gradientColor,
        cursor: props.item?.chanceWining ? "pointer" : "default",
      }}
      onMouseEnter={() => setShowChances(true)}
      onMouseLeave={() => setShowChances(false)}
    >
      {props.item?.chanceWining ? (
        <div className={styles.chance} style={{ opacity: showChances ? 1 : 0 }}>
          ~{props.item?.chanceWining}
        </div>
      ) : null}
      <img
        className={styles.image}
        src={props.item?.image ?? ItemImage}
        style={{ opacity: props.item?.chanceWining && showChances ? 0 : 1 }}
        alt=""
      />
    </div>
  );
};

export default React.memo(Small);
