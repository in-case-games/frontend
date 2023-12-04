import React from "react";
import styles from "./text-area.module";

const TextArea = (props) => {
  const getBorderColor = () => {
    if (props.isError) return "red";
    else if (props.isApply) return "green";
    else return "#F8B415";
  };

  return (
    <div className={styles.text_area}>
      {props.subTittle ? (
        <div className={styles.sub_tittle}>{props.subTittle}</div>
      ) : null}
      <textarea
        name={props.name}
        placeholder={props.placeholder || ""}
        value={props.value || ""}
        maxLength={props.maxLength || 200}
        readOnly={props.isReadOnly || false}
        onInput={(e) => props.setValue(e.target.value)}
        rows={props.rows || 2}
        style={{
          borderColor: getBorderColor(),
          cursor: props.isReadOnly ? "default" : "pointer",
          resize: props.isDisabled || false ? "none" : "auto",
        }}
      />
    </div>
  );
};

export default React.memo(TextArea);
