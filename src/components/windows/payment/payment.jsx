import React, { useState } from "react";
import { InCoin, InCoinGray } from "../../../assets/images/icons";
import { ComboBox, Input } from "../../../components/common/inputs";
import Constants from "../../../constants";
import styles from "./payment.module";

const Payment = () => {
  const [amount, setAmount] = useState(50);
  const [typePay, setTypePay] = useState(
    Constants.TypePayments.find((t) => t.id === 1)
  );

  const sendToPaymentForm = () => {};

  return (
    <div className={styles.payment}>
      <div className={styles.payment_content}>
        <div className={styles.header}>
          <div className={styles.tittle}>Выберите тип</div>
          {typePay.currency && typePay.rate ? (
            <div className={styles.current_course}>
              <div className={styles.real_valuta}>1 {typePay.currency}</div>
              <div className={styles.equally}>=</div>
              <div className={styles.our_valuta}>
                {typePay.rate}{" "}
                <img alt="" className={styles.image} src={InCoin} />
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.content}>
          <ComboBox
            name="type-pay"
            value={typePay.name}
            values={Constants.TypePayments}
            setValue={() => {}}
            setIndex={(id) =>
              setTypePay(
                Constants.TypePayments.find((t) => t.id === Number(id))
              )
            }
          />
          {typePay.minAmount && typePay.maxAmount ? (
            <Input
              subTittle={`Потратите ${typePay.currency}: `}
              name="real-amount"
              value={amount}
              setValue={(v) => {
                if (/^\d+$/.test(v)) {
                  let newAmount = v;

                  if (v < typePay.minAmount) newAmount = typePay.minAmount;
                  if (v > typePay.maxAmount) newAmount = typePay.maxAmount;

                  setAmount(newAmount);
                }
              }}
              type="number"
            />
          ) : null}
          {typePay.rate ? (
            <Input
              subTittle="Получите InCoin: "
              name="our-amount"
              placeholder={`${amount * typePay.rate} инкоинов`}
              type="number"
              isReadOnly={true}
            />
          ) : null}
        </div>
        <div className={styles.footer}>
          <div className={styles.delimiter}></div>
          {typePay.description ? (
            <div className={styles.description}>{typePay.description}</div>
          ) : null}
          <div className={styles.button_pay} onClick={sendToPaymentForm}>
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
