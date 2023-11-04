import React, { useState } from "react";
import styles from "./pull-out.module";

const PullOutProfile = (props) => {
  return (
    <div
      className={styles.pull_out_profile}
      style={{
        background: props.type === "delete" ? "#be0809" : "#f8b415",
      }}
      onMouseDown={() => props.click()}
    >
      <img alt="" className={styles.image} src={props.image} />
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default PullOutProfile;