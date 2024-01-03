import React from "react";
import { Info as InfoButton } from "../../../../components/common/buttons";
import styles from "../../info.module";

const Bar = (props) => {
  return (
    <div className={styles.panel_bar}>
      <InfoButton
        isActive={props.content !== "cookie-policy"}
        click={() => props.exchange("user-agreement")}
        tittle="Соглашение"
      />
      <InfoButton
        isActive={props.content === "cookie-policy"}
        click={() => props.exchange("cookie-policy")}
        tittle="Куки"
      />
    </div>
  );
};

export default Bar;
