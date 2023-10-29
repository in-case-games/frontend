import React from "react";
import { useNavigate } from "react-router-dom";
import { TemplateBox as BoxImage } from "../../../assets/images/main";
import styles from "./big.module";

const Big = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className={props.box.isLocked ? styles.box_locked : styles.box}
      onClick={() => navigate(`/box/${props.box.id}`)}
    >
      <img
        alt=""
        href={`/box/${props.box.id}`}
        src={props.box.image ?? BoxImage}
        className={styles.image}
      />
      <div className={styles.name}>{props.box.name}</div>
      <div className={styles.button_cost}>
        {Math.ceil(props.box.cost)}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.69238 22.1539L10.5617 11.9008C13.1779 7.99592 18.9246 8.00907 21.5229 11.9259V11.9259C24.4273 16.3042 21.288 22.1539 16.0339 22.1539H8.58826"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className={styles.delimiter}></div>
    </div>
  );
};

export default React.memo(Big);
