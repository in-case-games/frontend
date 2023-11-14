import React from "react";
import styles from "./box-group.module";
import { Converter } from "../../helpers/converter";

const BoxGroup = (props) => {
  return (
    <div
      className={styles.box_group}
      onClick={() => {
        if (props.showWindow) props.showWindow(props.group);
      }}
    >
      {props.group?.name ? Converter.cutString(props.group?.name, 25) : "+"}
    </div>
  );
};

export default React.memo(BoxGroup);
