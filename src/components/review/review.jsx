import React, { useState } from "react";
import { Converter } from "../../helpers/converter";
import { InfoBlack as Info } from "../../assets/images/icons";
import { useNavigate } from "react-router-dom";
import styles from "./review.module";

const Review = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

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
          <img
            className={styles.image}
            src={props.image}
            alt=""
            style={{ cursor: props.showMiniProfile ? "pointer" : "default" }}
            onClick={(e) => {
              e.stopPropagation();

              if (props.showMiniProfile) props.showMiniProfile();
            }}
          />
        </div>
        <div className={styles.score} style={{ color: getColorScore() }}>
          {props.score}
        </div>
        <img
          className={styles.info}
          alt=""
          src={Info}
          onClick={(e) => {
            e.stopPropagation();

            navigate(`/reviews/${props.id}`);
          }}
        />
      </div>
      <div className={styles.review_face__back}>
        <div className={styles.inner}>{props.content}</div>
      </div>
    </div>
  );
};

export default React.memo(Review);
