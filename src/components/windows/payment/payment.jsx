import React, { useState } from "react";
import { InCoin, InCoinGray } from "../../../assets/images/icons";
import { ComboBox, Input } from "../../../components/common/inputs";
import styles from "./payment.module";

const Payment = (props) => {
  const [amount, setAmount] = useState(0);
  return (
    <div className={styles.payment}>
      <div className={styles.payment_content}>
        <div className={styles.header}>
          <div className={styles.tittle}>Выберите тип</div>
          <div className={styles.current_course}>
            <div className={styles.real_valuta}>1 RUB</div>
            <div className={styles.equally}>=</div>
            <div className={styles.our_valuta}>
              7 <img alt="" className={styles.image} src={InCoin} />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <ComboBox name="type-pay" />
          <Input
            subTittle="Потратите RUB: "
            name="real-amount"
            value={amount}
            setValue={(v) => {
              if (v >= 0) setAmount(v);
            }}
            type="number"
          />
          <Input
            subTittle="Получите InCoin: "
            name="our-amount"
            placeholder={`${amount * 7} инкоинов`}
            type="number"
            isReadOnly={true}
          />
        </div>
        <div className={styles.footer}>
          <div className={styles.button_pay}>
            {" "}
            <img alt="" src={InCoinGray} className={styles.image} />
            <div className={styles.text}>Пополнить</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
