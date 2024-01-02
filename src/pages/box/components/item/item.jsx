import React from "react";
import { useNavigate } from "react-router-dom";
import { TemplateItem as ItemImage } from "../../../../assets/images/main";
import { AirplaneBlack, InCoinGray } from "../../../../assets/images/icons";
import { Converter } from "../../../../helpers/converter";
import { Item as ItemApi } from "../../../../api";
import { Handler } from "../../../../helpers/handler";
import Constants from "../../../../constants";
import styles from "./item.module";

const Item = (props) => {
  const itemApi = new ItemApi();
  const navigate = useNavigate();

  const getGradientColor = () =>
    Constants.ItemGradientsNoTransparent[
      props.item.rarity ? props.item.rarity : "white"
    ];

  return (
    <div className={styles.item} style={{ background: getGradientColor() }}>
      <div className={styles.part_top}></div>
      <div className={styles.part_left}></div>
      <div className={styles.part_left__border}></div>
      <div className={styles.part_right}></div>
      <div className={styles.part_right__border}></div>
      <div className={styles.part_center}>
        <div className={styles.button_back} onClick={() => props.goBack()}>
          {"<"} Назад
        </div>
        <div className={styles.content}>
          <div className={styles.tittle}>{props.item?.name}</div>
          <img
            alt=""
            className={styles.image}
            src={props.item?.image || ItemImage}
          />
        </div>
      </div>
      <div className={styles.part_bottom}>
        <div
          className={styles.button_sell}
          onClick={async () =>
            await Handler.error(async () => {
              await itemApi.sellLastByItemId(props.item.id);
              props.goBack();
            })
          }
        >
          {props.item?.cost ? Converter.cutCost(props.item?.cost) : null}
          <img className={styles.image} alt="" src={InCoinGray} />
        </div>
        <div
          className={styles.button_send}
          onClick={() => navigate("/profile")}
        >
          <img className={styles.image} alt="" src={AirplaneBlack} />
        </div>
      </div>
    </div>
  );
};

export default Item;
