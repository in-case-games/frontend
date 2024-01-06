import React, { useEffect, useState } from "react";
import {
  TemplateItem as ItemImage,
  TemplateUser as UserImage,
} from "../../../assets/images/main";
import { User as UserApi } from "../../../api";
import { LoadingArrow as Loading } from "../../loading";
import { Input } from "../../common/inputs";
import { useNavigate } from "react-router-dom";
import { Converter } from "../../../helpers/converter";
import { InCoin } from "../../../assets/images/icons";
import { Handler } from "../../../helpers/handler";
import TokenService from "../../../services/token";
import styles from "./inventory.module";

const Inventory = (props) => {
  const userApi = new UserApi();
  const observerRole = TokenService.getUser()?.role ?? "user";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [backRemove, setBackRemove] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backRemove !== null) {
        let t = backRemove - 1;
        t = t >= 0 ? t : 0;

        setBackRemove(t);

        if (t === 0) {
          setBackRemove(null);

          await Handler.error(async () => {
            await userApi.deleteUserInventoryByAdmin(props.inventory.id);
            props.close();
          });
        }
      }

      setIsLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.inventory}>
      <div className={styles.inventory_content}>
        <div className={styles.inventory_header}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.tittle}>Инвентарь</div>
        </div>
        <div className={styles.inventory_info}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <img
                alt=""
                src={props.inventory.user?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  navigate(`/profile/${props.inventory.user.id}`);
                  props.close();
                }}
              />
              <Input
                name="history-user"
                placeholder="Название пользователя"
                isReadOnly={true}
                value={props.inventory.user?.login}
              />
            </div>
            <div className={styles.input}>
              <img
                alt=""
                src={props.inventory.item?.image ?? ItemImage}
                className={styles.image}
                onClick={() => {
                  if (props.setItem) props.setItem(props.inventory.item);
                }}
              />
              <Input
                name="history-item"
                placeholder="Название предмета"
                isReadOnly={true}
                value={props.inventory.item?.name}
              />
            </div>
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.additional_info}>
            <div className={styles.cost}>
              Фиксированная стоимость:{" "}
              {Converter.cutCost(props.inventory.fixedCost)}
              <img alt="" className={styles.image} src={InCoin} />
            </div>
            <div className={styles.date}>
              {Converter.getMiniDate(props.inventory.date)}
            </div>
          </div>
        </div>
        <div className={styles.delimiter}></div>
        {observerRole === "owner" ? (
          <div className={styles.inventory_buttons}>
            {backRemove === null ? (
              <div
                className={styles.button_delete}
                onClick={() => setBackRemove(5)}
              >
                Удалить
              </div>
            ) : null}
            {backRemove !== null ? (
              <div
                className={styles.button_back}
                onClick={() => setBackRemove(null)}
              >
                <div className={styles.text}>Вернуть</div>
                <div className={styles.timer}>{backRemove}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Inventory;
