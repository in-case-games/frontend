import React, { useEffect, useState } from "react";
import Dot from "./dot";
import styles from "./automatic-dot.module";

const AutomaticDot = (props) => {
  const [isStart, setIsStart] = useState(true);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setIsStart(false);

        const result = [];
        let c = props.counter >= props.maxValue ? 1 : props.counter + 1;

        for (let i = 1; i <= props.maxValue; i++) {
          result.push(<Dot isActive={i === c} key={i} />);
        }

        props.setCounter(c);
        setDots(result);
      },
      isStart ? 1000 : 3000
    );

    return () => clearInterval(interval);
  });

  return <div className={styles.automatic_dot}>{dots}</div>;
};

export default React.memo(AutomaticDot);
