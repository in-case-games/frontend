import React, { useState } from "react";
import styles from "./dropdown.module";

const DropDown = (props) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className={styles.dropdown} onClick={() => setIsShow(!isShow)}>
      <div className={styles.question}>
        <div className={styles.button_show}>{isShow ? "-" : "+"}</div>
        <div className={styles.text}>{props.question}</div>
      </div>
      {isShow ? <div className={styles.answer}>{props.answer}</div> : null}
    </div>
  );
};

export default DropDown;
