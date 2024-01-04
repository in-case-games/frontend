import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TemplateUser as UserImage,
  TemplateItem as ItemImage,
} from "../../../assets/images/main";
import { Input } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import styles from "./history-withdrawn.module";

const HistoryWithdrawn = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.history_withdrawn}>
      <div className={styles.withdrawn_content}>
        <div className={styles.withdrawn_header}>
          <div className={styles.tittle}>История вывода</div>
        </div>
        <div className={styles.withdrawn_info}>
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
            <div className={styles.input}>
              <img
                alt=""
                src={props.history.item?.image ?? ItemImage}
                className={styles.image}
                onClick={() => {
                  if (props.setItem) props.setItem(props.history.item);
                }}
              />
              <Input
                name="history-item"
                placeholder="Название предмета"
                isReadOnly={true}
                value={props.history.item?.name}
              />
            </div>
            <Input
              name="history-invoice-id"
              subTittle="ID"
              isReadOnly={true}
              value={props.history.invoiceId}
            />
            <Input
              name="history-cost"
              subTittle="Стоимость"
              isReadOnly={true}
              value={props.history.fixedCost}
            />
            <Input
              name="history-status"
              subTittle="Статус"
              isReadOnly={true}
              value={props.history.status}
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

export default HistoryWithdrawn;
