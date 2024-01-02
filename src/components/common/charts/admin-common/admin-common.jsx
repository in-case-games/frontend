import React, { useState, useEffect } from "react";
import { ComboBox } from "../../inputs";
import StatisticsService from "../../../../services/statistics";
import Constants from "../../../../constants";
import styles from "./admin-common.module";

const AdminCommon = (props) => {
  const [chart, setChart] = useState();
  const [dots, setDots] = useState(20);
  const [delay, setDelay] = useState(6);
  const [watch, setWatch] = useState(0);
  const [typeDelay, setTypeDelay] = useState("seconds");

  useEffect(() => {
    const interval = setInterval(async () => {
      if (props.isLoading && props.statistics) {
        const chunk =
          delay *
          Constants.CommonTypeTimeDelays.find((t) => t.name === typeDelay).id;
        const time = chunk <= watch ? 1 : watch + 1;

        if (time === 1) {
          const chunked = StatisticsService.getChunkedStatistics(
            props.statistics,
            delay,
            typeDelay,
            dots
          );
          setChart(StatisticsService.renderCommonChart(chunked));
        }

        setWatch(time);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.chart}>
      <div className={styles.chart_tittle}>
        <div className={styles.tittle}>Основная статистика</div>
        <div className={styles.dots}>
          <ComboBox
            name="dots"
            subTittle="Точек"
            value={dots}
            values={Constants.CountDots}
            setValue={(v) => {
              setWatch(0);
              setDots(v);
            }}
          />
        </div>
        <div className={styles.delay}>
          <ComboBox
            name="delay"
            subTittle="Задержка"
            value={delay}
            values={Constants.CommonTimeDelays}
            setValue={(v) => {
              setWatch(0);
              setDelay(v);
            }}
          />
          <ComboBox
            name="type-delay"
            value={typeDelay}
            values={Constants.CommonTypeTimeDelays}
            setValue={(v) => {
              setWatch(0);
              setTypeDelay(v);
            }}
          />
        </div>
      </div>
      <div className={styles.inner}>{chart}</div>
    </div>
  );
};

export default AdminCommon;
