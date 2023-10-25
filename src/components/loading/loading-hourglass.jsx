import React, { useEffect, useRef, useState } from "react";
import styles from "./loading.module";

const LoadingHourglass = (props) => {
  const observer = useRef(null);

  const [percent, setPercent] = useState(1);
  const [color, setColor] = useState("transparent");
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      () => setHeight(observer.current.clientHeight),
      100
    );

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = Math.round(new Date(props.updateDate) / 1000);
      const newDate = Math.round(new Date() / 1000);

      const difference = newDate - date;
      const rate = props.rate ? props.rate : 200;

      let temp = 1 - difference / rate;

      temp = temp < 0 ? 0 : temp;

      if (temp >= 0.7) setColor("green");
      else if (temp >= 0.4) setColor("orange");
      else setColor("red");

      setPercent(temp);
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.loading_hourglass} ref={observer}>
      <div
        className={styles.hourglass}
        style={{ height: `${height * percent}px`, background: color }}
      ></div>
    </div>
  );
};

export default React.memo(LoadingHourglass);
