import React, { useState } from "react";
import { LoadingArrow as Loading } from "../../loading";
import styles from "./payment.module";
import { Converter } from "../../../helpers/converter";

const Payment = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getBackgroundColor = () => {
    if (isLoading || !props.history.isBackMoney) return "green";
    else if (error) return "red";
    else return "#006d7f";
  };

  const getColor = () => {
    if (isLoading || !props.history.isBackMoney) return "greenyellow";
    else if (error) return "black";
    else return "rgb(141 254 255)";
  };

  const getStatus = () => {
    if (isLoading)
      return (
        <div className={styles.loading}>
          <Loading isLoading={isLoading} cursor="default" />
        </div>
      );
    else if (error) return "✖";
    else if (props.history.isBackMoney) return "→";
    else return "✓";
  };

  const click = (e) => {
    e.stopPropagation();

    if ((props.history.isBackMoney || error) && !isLoading) {
      //TODO Back Money
      setIsLoading(true);
      setError(true);
    }
  };

  return (
    <div className={styles.history} onClick={props.click}>
      <div className={styles.history_content}>
        <div className={styles.history_money}>
          <div className={styles.amount}>
            {Converter.cutCost(props.history.amount)}
          </div>
          <div className={styles.currency}>{props.history.currency}</div>
        </div>
        <div className={styles.date}>
          {Converter.getMiniDate(props.history.date)}
        </div>
      </div>
      <div
        className={styles.button_status}
        onClick={click}
        style={{
          background: getBackgroundColor(),
          color: getColor(),
          cursor:
            props.history.isBackMoney && !isLoading ? "pointer" : "default",
        }}
      >
        {getStatus()}
      </div>
    </div>
  );
};

export default React.memo(Payment);
