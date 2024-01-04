import React, { useRef } from "react";
import styles from "./banner.module";

const Banner = (props) => {
  const windowWidth = useRef(window.innerWidth);

  return (
    <div
      className={styles.banner}
      onClick={props.click}
      style={{
        width: `${windowWidth.current > 1000 ? 1000 : windowWidth.current}px`,
      }}
    >
      <img className={styles.image} alt="" src={props.image} />
    </div>
  );
};

export default React.memo(Banner);
