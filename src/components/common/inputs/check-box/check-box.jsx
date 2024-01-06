import React from "react";
import { Link } from "../../buttons";
import styles from "./check-box.module";

const CheckBox = (props) => {
  const getStyle = () => {
    if (props.value)
      return props.isReadOnly
        ? styles.check_box_on__disabled
        : styles.check_box_on;
    else
      return props.isReadOnly
        ? styles.check_box_off__disabled
        : styles.check_box_off;
  };

  return (
    <div className={styles.check_box}>
      <div
        className={getStyle()}
        onClick={() =>
          props.setValue(props.isReadOnly ? props.value : !props.value)
        }
      >
        {props.value ? "✓" : ""}
      </div>
      {props.link ? (
        <Link text={props.subTittle} link={props.link} isScrollToTop={true} />
      ) : (
        <div className={styles.subTittle}>{props.subTittle}</div>
      )}
    </div>
  );
};

export default React.memo(CheckBox);
