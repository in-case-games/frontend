import React, { useEffect, useState } from "react";
import { TemplateItem as ItemImage } from "../../../assets/images/main";
import {
  InCoin,
  Info,
  TransferIvory as Transfer,
} from "../../../assets/images/icons";
import { LoadingHourglass as Loading, LoadingArrow } from "../../loading";
import Constants from "../../../constants";
import { Converter } from "../../../helpers/converter";
import styles from "./simple.module";

const Simple = (props) => {
  const [gradientColor, setGradientColor] = useState("transparent");
  const [statusColor, setStatusColor] = useState("transparent");
  const [statusCursor, setStatusCursor] = useState("default");

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientColor(getGradientColor());

      if (props.status) {
        setStatusCursor(props.status === "exchange" ? "pointer" : "default");
        setStatusColor(
          Constants.ItemGradients[Constants.StatusAndColor[props.status]]
        );
      }
    }, 10);

    return () => clearInterval(interval);
  });

  const getGradientColor = () => {
    const selected = props.selectItems;
    const isSelected =
      selected && selected.items.find((i) => i.id === props.id);
    const color = props.item?.rarity ? props.item?.rarity : "white";

    return Constants.ItemGradients[isSelected ? "green" : color];
  };

  const clickInfo = (e) => {
    e.stopPropagation();
    props.showInfo();
  };

  const clickItem = () => {
    if (props.showItem) props.showItem(props.item);
    else if (props.selectItems?.items) props.select();

    setGradientColor(getGradientColor());
  };

  return (
    <div className={styles.item_simple} onClick={clickItem}>
      <img
        alt=""
        src={props.item?.image ?? ItemImage}
        style={{ background: gradientColor }}
        className={styles.item_image}
      />
      <div className={styles.item_info}>
        <div className={styles.name}>
          {Converter.cutString(props.item?.name || "", 12)}
        </div>
        <div className={styles.cost}>
          {Converter.cutCost(props.item?.cost)}
          <img alt="" src={InCoin} className={styles.image} />
        </div>
        <div className={styles.game}>{props.item?.game}</div>
      </div>
      {props.isShowUpdate ? (
        <div className={styles.loading}>
          <Loading updateDate={props.item?.updateDate} rate={300} />
        </div>
      ) : null}
      {props.showInfo ? (
        <div className={styles.info} onClick={clickInfo}>
          <img alt="" src={Info} />
        </div>
      ) : null}
      {props.showStatus ? (
        <div
          className={styles.item_status}
          style={{ background: statusColor, cursor: statusCursor }}
        >
          {props.isLoading || props.status === "wait" ? (
            <div className={styles.loading}>
              <LoadingArrow
                isLoading={props.isLoading}
                setLoading={() => {}}
                cursor="default"
              />
            </div>
          ) : null}
          {props.error !== null ? (
            <div className={styles.error}>{props.error}</div>
          ) : null}
          {props.status === "exchange" ? (
            <img src={Transfer} alt="" className={styles.image} />
          ) : null}
          {props.status === "success" ? "✔" : null}
          {props.status === "cancel" ? "✖" : null}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Simple);
