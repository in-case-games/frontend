import React, { useState } from "react";
import { TemplateUser as UserLogo } from "../../assets/images/main";
import { InfoBlack as Info } from "../../assets/images/icons";
import { Converter } from "../../helpers/converter";
import styles from "./restriction.module";

const Restriction = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getBackground = () =>
    new Date(props.restriction?.expirationDate || 0) <= new Date()
      ? "#c7bfad"
      : "#F8B415";

  const clickInfo = (e) => {
    e.stopPropagation();

    if (props.showRestriction) props.showRestriction(props.restriction || {});
  };

  const showProfile = () => {
    if (props.showMiniProfile)
      props.showMiniProfile(
        props.isUser ? props.restriction.ownerId : props.restriction.userId
      );
  };

  return (
    <div className={styles.restriction}>
      <div
        className={styles.restriction_user}
        style={{ background: getBackground() }}
        onClick={showProfile}
      >
        <img
          className={styles.image}
          alt=""
          src={
            props.isUser
              ? props.restriction?.owner?.image ?? UserLogo
              : props.restriction?.user?.image ?? UserLogo
          }
        />
      </div>
      <div
        className={
          isFlipped
            ? styles.restriction_inner__flipped
            : styles.restriction_inner
        }
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {props.restriction ? (
          <div
            className={styles.restriction_info}
            style={{ background: getBackground() }}
          >
            <div className={styles.type}>
              Тип:
              {props.restriction.type.name}
            </div>
            <div className={styles.creation}>
              Создан:
              {Converter.getMiniDate(props.restriction.creationDate)}
            </div>
            <div className={styles.expiration}>
              Истечет:
              {new Date(props.restriction?.expirationDate) > new Date()
                ? Converter.getMiniDate(props.restriction?.expirationDate)
                : "истёк"}
            </div>
            <div className={styles.info} onClick={clickInfo}>
              <img alt="" src={Info} />
            </div>
          </div>
        ) : (
          <div
            className={styles.restriction_info}
            style={{ background: getBackground() }}
          >
            Пусто
            <div className={styles.info} onClick={clickInfo}>
              <img alt="" src={Info} />
            </div>
          </div>
        )}
        <div
          className={styles.restriction_description}
          style={{ background: getBackground() }}
        >
          <div className={styles.description}>
            {props.restriction?.description
              ? Converter.cutString(props.restriction?.description, 80)
              : "Пусто"}
          </div>
          <div className={styles.info} onClick={clickInfo}>
            <img alt="" src={Info} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Restriction);
