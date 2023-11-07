import React from "react";
import { TemplateUser as UserImage } from "../../../assets/images/main";
import { Input } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import { useNavigate } from "react-router-dom";
import styles from "./restriction.module";

const Restriction = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.restriction}>
      <div className={styles.restriction_content}>
        <div className={styles.restriction_header}>
          <div className={styles.tittle}>Ограничение</div>
        </div>
        <div className={styles.restriction_info}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <img
                alt=""
                src={props.restriction.user?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  navigate(`/profile/${props.restriction?.user?.id}`);
                  props.close();
                }}
              />
              <Input
                name="history-user"
                placeholder="Логин пользователя"
                isReadOnly={true}
                value={props.restriction?.user?.login}
              />
            </div>
            <div className={styles.input}>
              <img
                alt=""
                src={props.restriction.owner?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  navigate(`/profile/${props.restriction?.owner?.id}`);
                  props.close();
                }}
              />
              <Input
                name="history-owner"
                placeholder="Логин создателя"
                isReadOnly={true}
                value={props.restriction?.owner?.login + " - Создатель"}
              />
            </div>
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.additional_info}>
            <div className={styles.date}>
              {Converter.getMiniDate(props.restriction.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restriction;
