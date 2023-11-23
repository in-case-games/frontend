import React, { useState, useEffect } from "react";
import {
  KeyGray as Key,
  InCoinGray as InCoin,
} from "../../../../assets/images/icons";
import { User as UserApi } from "../../../../api";
import { Converter } from "../../../../helpers/converter";
import styles from "./roulette.module";

const Roulette = (props) => {
  const userApi = new UserApi();

  const [hovered, setHovered] = useState(false);

  const clickOpenBox = async () => {
    if (props.user.balance && props.box?.cost <= props.user?.balance) {
      props.setIsRollingRoulette(true);

      const winItem = await userApi.openBox(props.box.id);
      const findItem = props.box.inventory.find(
        (i) => i.item.id === winItem.id
      ).item;
      const res = Object.assign(winItem, findItem);

      props.setWinItem(res);

      setTimeout(
        () => props.setIsRollingRoulette(false),
        Converter.getRandomInt(1, 5) * 1000
      );
    }
  };

  const getTextButton = () => {
    if (!props.user) return <div className={styles.text}>Вход</div>;
    if (!props.user.balance || props.box?.cost > props.user?.balance)
      return <div className={styles.text}>Пополнить баланс</div>;

    return (
      <div className={styles.text}>
        <img className={styles.key} alt="" src={Key} />
        Открыть за {Converter.cutCost(props.box?.cost, (v) => Math.ceil(v))}
        <img className={styles.inCoin} alt="" src={InCoin} />
      </div>
    );
  };

  const getStyles = () => {
    const isOrange = !props.user || props.box?.cost <= props.user?.balance;

    return {
      cursor: isOrange ? "pointer" : "default",
      background: isOrange ? "#f8b415" : "#b8b8b8",
      minWidth: hovered ? "200px" : "150px",
      height: hovered ? "35px" : "30px",
    };
  };

  return (
    <div className={styles.roulette}>
      {!props.isRollingRoulette ? (
        <div
          className={styles.button_open}
          style={getStyles()}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={clickOpenBox}
        >
          {getTextButton()}
        </div>
      ) : null}
    </div>
  );
};

export default Roulette;
