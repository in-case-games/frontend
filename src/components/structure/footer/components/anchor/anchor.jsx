import React from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "./anchor.module";

const Anchor = () => (
  <div className={styles.button_anchor} onClick={() => scroll.scrollToTop()}>
    <div className={styles.line}></div>
  </div>
);

export default React.memo(Anchor);
