import React, { useEffect, useState } from "react";
import {
  TemplateBox as BoxImage,
  TemplateItem as ItemImage,
  TemplateUser as UserLogo,
} from "../../../assets/images/main";
import { Box as BoxApi, User as UserApi } from "../../../api";
import { LoadingArrow as Loading } from "../../loading";
import { Converter } from "../../../helpers/converter";
import { Handler } from "../../../helpers/handler";
import Constants from "../../../constants";
import styles from "./opening-history.module";

const OpeningHistory = (props) => {
  const boxApi = new BoxApi();
  const userApi = new UserApi();

  const date = Converter.getMiniDate(props.history.date);
  const itemName = Converter.cutString(props.history.item.name, 20);
  const color = props.history.item.rarity ? props.history.item.rarity : "white";
  const itemColor = Constants.ItemColors[color];
  const gradientColor = Constants.ItemGradients[color];

  const [isStart, setIsStart] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const [box, setBox] = useState(null);
  const [userLogo, setUserLogo] = useState(UserLogo);
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);
        setUserLogo(await userApi.getImageByUserId(props.history.userId));
      },
      isStart ? 100 : 5000
    );

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isClick && !box) {
        await Handler.error(
          async () => {
            setIsClick(false);
            let box = await boxApi.getById(props.history.boxId);
            setBox(await boxApi.pushImage(box));
          },
          undefined,
          undefined,
          penaltyDelay,
          setPenaltyDelay
        );
      }
    }, 10 + penaltyDelay);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.opening_history}>
      <div
        className={styles.history_user}
        style={{
          background: gradientColor,
          borderBottom: `5px solid ${itemColor}`,
        }}
        onClick={() => props.showMiniProfile()}
      >
        <img alt="" src={userLogo} className={styles.image} />
      </div>
      <div
        className={
          isFlipped ? styles.history_inner__flipped : styles.history_inner
        }
        onClick={() => {
          setIsClick(true);
          setIsFlipped(!isFlipped);
        }}
      >
        <div
          className={styles.history_item}
          style={{
            background: gradientColor,
            borderBottom: `5px solid ${itemColor}`,
          }}
        >
          <img
            className={styles.image}
            src={props.history.item.image ?? ItemImage}
            alt=""
          />
          <div className={styles.name}>{itemName}</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div
          className={styles.history_box}
          style={{
            background: Constants.ItemGradients["orange"],
            borderBottom: `5px solid ${Constants.ItemColors["orange"]}`,
          }}
        >
          {box ? (
            <img className={styles.image} src={box.image ?? BoxImage} alt="" />
          ) : null}
          {box ? (
            <div className={styles.name}>
              {Converter.cutString(box.name, 20)}
            </div>
          ) : null}
          {box ? <div className={styles.date}>{date}</div> : null}
          {!box ? <Loading isLoading={true} cursor="default" /> : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(OpeningHistory);
