import React from "react";
import styles from "./input.module";

const Input = (props) => {
  const getBorderColor = () => {
    if (props.color) return props.color;
    if (props.isError) return "red";
    else if (props.isApply) return "green";
    else return "#F8B415";
  };

  return (
    <div className={styles.input}>
      {props.subTittle ? (
        <div className={styles.sub_tittle}>{props.subTittle}</div>
      ) : null}
      <input
        name={props.name}
        placeholder={props.placeholder || ""}
        value={props.value || ""}
        maxLength={props.maxLength || 200}
        readOnly={props.isReadOnly || false}
        onInput={(e) => props.setValue(e.target.value)}
        onKeyDown={(e) => {
          if (props.onKeyDown) props.onKeyDown(e);
        }}
        type={props.type || "text"}
        style={{
          color: getBorderColor(),
          borderColor: getBorderColor(),
          cursor: props.isReadOnly ? "default" : "pointer",
        }}
      />
    </div>
  );
};

export default React.memo(Input);
