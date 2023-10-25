import React, { useEffect, useState } from "react";
import { TemplateUser as UserLogo } from "../../assets/images/main";
import { User as UserApi } from "../../api";
import styles from "./restriction.module";
import { Converter } from "../../helpers/converter";

const Restriction = (props) => {
  const userApi = new UserApi();

  const [isStart, setIsStart] = useState(true);

  const [image, setImage] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);

        if (!image) {
          const id = props.isOwnerImage
            ? props.restriction.ownerId
            : props.restriction.userId;

          setImage(await userApi.getImageByUserId(id));
        }
      },
      isStart ? 100 : 10000
    );

    return () => clearInterval(interval);
  });

  const getBackground = () =>
    new Date(props.restriction.expirationDate) > new Date()
      ? "#F8B415"
      : "#c7bfad";

  return (
    <div className={styles.restriction}>
      <div
        className={styles.restriction_user}
        style={{ background: getBackground() }}
        onClick={() => props.showMiniProfile()}
      >
        <img className={styles.image} alt="" src={image ?? UserLogo} />
      </div>
      <div
        className={
          isFlipped
            ? styles.restriction_inner__flipped
            : styles.restriction_inner
        }
        onClick={() => setIsFlipped(!isFlipped)}
      >
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
            {new Date(props.restriction.expirationDate) > new Date()
              ? Converter.getMiniDate(props.restriction.expirationDate)
              : "истёк"}
          </div>
        </div>
        <div
          className={styles.restriction_description}
          style={{ background: getBackground() }}
        >
          <div className={styles.description}>
            {Converter.cutString(props.restriction.description, 80)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Restriction);
