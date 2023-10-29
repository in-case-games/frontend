import React from "react";
import styles from "./game.module";

const Game = (props) => {
  return (
    <div className={styles.game} onClick={props.click}>
      <img className={styles.image} alt="" src={props.image} />
      <div className={styles.delimiter}></div>
    </div>
  );
};

export default React.memo(Game);
