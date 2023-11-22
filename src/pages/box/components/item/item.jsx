import React from "react";
import styles from "./item.module";

const Item = (props) => {
  return (
    <div className={styles.item} onClick={() => props.goBack()}>
      Item
      {props.winItem?.name}
    </div>
  );
};

export default Item;
