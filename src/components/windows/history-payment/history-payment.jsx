import React from "react";
import { TemplateUser as UserImage } from "../../../assets/images/main";
import { Input } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import styles from "./history-payment.module";
import { useNavigate } from "react-router-dom";

const HistoryPayment = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.history_payment}>
      <div className={styles.payment_content}>
        <div className={styles.payment_header}>
          <div className={styles.tittle}>История открытия</div>
        </div>
        <div className={styles.payment_info}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <img
                alt=""
                src={props.history.user?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  navigate(`/profile/${props.history.user.id}`);
                  props.close();
                }}
              />
              <Input
                name="history-user"
                placeholder="Название пользователя"
                isReadOnly={true}
                value={props.history.user?.login}
              />
            </div>
            <Input
              name="history-invoice-id"
              subTittle="ID в платежке"
              isReadOnly={true}
              value={props.history.invoiceId}
            />
            <Input
              name="history-amount"
              subTittle="Сумма"
              isReadOnly={true}
              value={props.history.amount + " " + props.history.currency}
            />
            <Input
              name="history-is-back-money"
              subTittle="Можно вернуть?"
              isReadOnly={true}
              value={props.history.isBackMoney ? "Да" : "Нет"}
            />
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.additional_info}>
            <div className={styles.date}>
              {Converter.getMiniDate(props.history.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPayment;