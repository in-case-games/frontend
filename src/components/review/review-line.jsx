import React, { useState, useEffect } from "react";
import { Converter } from "../../helpers/converter";
import styles from "./review.module";

const ReviewLine = (props) => {
  const [style, setStyle] = useState({});

  const getColorScore = () => {
    if (props.review?.score > 3) return "green";
    else if (props.review?.score === 3) return "#930000";
    else return "red";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle(
        props.isSelected ? { background: "rgba(0, 255, 132, 0.2)" } : {}
      );
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div
      className={styles.review_line}
      style={style}
      onClick={() => {
        if (props.click) props.click();
      }}
    >
      <div className={styles.content}>
        <img
          className={styles.image}
          src={props.review?.user?.image}
          alt=""
          style={{ cursor: props.showMiniProfile ? "pointer" : "default" }}
          onClick={(e) => {
            e.stopPropagation();

            if (props.showMiniProfile) props.showMiniProfile();
          }}
        />
        <div className={styles.tittle}>
          {Converter.cutString(props.review?.title, 25)}
        </div>
        <div className={styles.description}>
          {Converter.cutString(props.review?.content, 25)}
        </div>
        <div className={styles.date}>
          {Converter.getMiniDate(props.review?.creationDate || new Date())}
        </div>
        <div className={styles.score} style={{ color: getColorScore() }}>
          {props.review?.score}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReviewLine);
