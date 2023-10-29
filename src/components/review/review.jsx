import React, { useState } from "react";
import { Converter } from "../../helpers/converter";
import styles from "./review.module";

const Review = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getColorScore = () => {
    if (props.score > 3) return "green";
    else if (props.score === 3) return "#930000";
    else return "red";
  };

  return (
    <div
      className={isFlipped ? styles.review__flipped : styles.review}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles.review_face__front}>
        <div className={styles.review_header}>
          <div className={styles.mini_info}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.date}>
              {Converter.getMiniDate(props.date)}
            </div>
          </div>
          <img className={styles.image} src={props.image} alt="" />
        </div>
        <div className={styles.score} style={{ color: getColorScore() }}>
          {props.score}
        </div>
      </div>
      <div className={styles.review_face__back}>
        <div className={styles.inner}>{props.content}</div>
      </div>
    </div>
  );
};

export default React.memo(Review);
