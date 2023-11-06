import React from "react";
import styles from "./combo-box.module";

const ComboBox = (props) => {
  const getBorderColor = () => {
    if (props.isError) return "red";
    else if (props.isApply) return "green";
    else return "#F8B415";
  };

  return (
    <div className={styles.combo_box}>
      {props.subTittle ? (
        <div className={styles.sub_tittle}>{props.subTittle}</div>
      ) : null}
      <select
        name={props.name}
        value={props.value}
        disabled={props.isReadOnly || false}
        onChange={(e) => {
          const select = e.target;
          props.setValue(select.value);

          if (props.setIndex)
            props.setIndex(select.children[select.selectedIndex].id);
        }}
        style={{
          borderColor: getBorderColor(),
          cursor: props.isReadOnly ? "default" : "pointer",
        }}
      >
        {props.values.map((v) => (
          <option key={v.id} id={v.id}>
            {v.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(ComboBox);
