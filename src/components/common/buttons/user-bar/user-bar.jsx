import React from "react";
import { useNavigate } from "react-router-dom";
import {
  InCoinLightGreen as InCoin,
  PlusLightGreen as Plus,
  KeyGray as Key,
} from "../../../../assets/images/icons";
import styles from "./user-bar.module";

const UserBar = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.user_bar}>
      {props.isAuth && props.user ? (
        <div className={styles.user_bar__auth}>
          <div
            className={styles.button_balance}
            onClick={() => props.showWindow("payment")}
          >
            <img alt="" src={Plus} />
            <div className={styles.user_bar_balance}>
              <div className={styles.balance_amount}>{props.user.balance}</div>
              <img alt="" src={InCoin} />
            </div>
          </div>
          <img
            alt=""
            src={props.user.image}
            onClick={() => navigate("/profile")}
          />
        </div>
      ) : null}
      {props.isSignIn ? (
        <div className={styles.user_bar__sign_in}>
          <div
            className={styles.sign_in_button}
            onClick={() => props.showWindow("sign_in")}
          >
            <img alt="" src={Key} />
            Вход
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(UserBar);