import React, { useState } from "react";
import { ArrowBottom } from "../../assets/images/icons";
import { Group as Slider } from "../../components/common/sliders";
import styles from "./group.module";

const Group = ({ name, sliderSpeed, isRolling, setRollingEnd, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const getItems = () => {
    if (!isOpen) return null;
    if (isRolling !== undefined || sliderSpeed)
      return (
        <Slider
          items={children}
          speed={sliderSpeed}
          isRolling={isRolling}
          setRollingEnd={setRollingEnd}
        />
      );
    if (children.length === 0) return <div className={styles.text}></div>;

    return children;
  };

  return (
    <div className={styles.group}>
      {isRolling === undefined ? (
        <div className={styles.group_header}>
          <div className={styles.group_tittle}>
            <div className={styles.tittle}>{name}</div>
            <img
              className={styles.image}
              alt=""
              src={ArrowBottom}
              style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <div className={styles.group_delimiter}>
            <div className={styles.top}></div>
            <div className={styles.bottom}>
              <div
                className={styles.vertical}
                style={{
                  borderColor: isOpen ? styles.border_color : "transparent",
                }}
              ></div>
              <div className={styles.center}>
                <div className={styles.line_one}></div>
                <div className={styles.line_two}></div>
              </div>
              <div
                className={styles.vertical}
                style={{
                  borderColor: isOpen ? styles.border_color : "transparent",
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.inner} style={{ opacity: isOpen ? 1 : 0 }}>
        {getItems()}
      </div>
    </div>
  );
};

export default Group;
