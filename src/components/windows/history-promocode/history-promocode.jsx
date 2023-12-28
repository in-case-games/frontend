import React, { useEffect, useState } from "react";
import { TemplateUser as UserImage } from "../../../assets/images/main";
import { ComboBox, Input } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import { useNavigate } from "react-router-dom";
import { Promocode as PromocodeApi } from "../../../api";
import styles from "./history-promocode.module";

const HistoryPromocode = (props) => {
  const promocodeApi = new PromocodeApi();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [penaltyDelay, setPenaltyDelay] = useState(0);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await errorHandler(async () => {
          if (!types || types.length === 0)
            setTypes(await promocodeApi.getTypes());
        });
      } catch (ex) {
        if (ex?.response?.status < 500 && ex?.response?.data?.error?.message) {
          console.log(ex);
          setErrorMessage(ex.response.data.error.message);
        } else {
          console.log(ex);
          setErrorMessage("Неизвестная ошибка");
        }
      }
    }, 500);

    return () => clearInterval(interval);
  });

  const errorHandler = async (action) => {
    try {
      await action();
    } catch (ex) {
      console.log(ex);

      setErrorMessage(
        ex?.response?.status < 500 && ex?.response?.data?.error?.message
          ? ex.response.data.error.message
          : "Неизвестная ошибка"
      );
      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1000
      );
    }
  };

  return (
    <div className={styles.history_promocode}>
      <div className={styles.promocode_content}>
        <div className={styles.promocode_header}>
          <div className={styles.tittle}>История промокодов</div>
        </div>
        <div className={styles.promocode_info}>
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
              name="history-name"
              subTittle="Название"
              isReadOnly={true}
              value={props.history.name}
            />
            <ComboBox
              name="history-type"
              subTittle="Тип"
              isReadOnly={true}
              value={props.history.type}
              values={types}
            />
            <Input
              name="history-discount"
              subTittle="Скидка"
              isReadOnly={true}
              value={props.history.discount + " %"}
            />
            <Input
              name="history-is-activated"
              subTittle="Активирован"
              isReadOnly={true}
              value={props.history.isActivated ? "Да" : "Нет"}
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

export default HistoryPromocode;
