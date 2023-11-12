import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Site as SiteApi } from "../../../../api";
import StatisticsService from "../../../../services/statistics";
import { ComboBox } from "../../../../components/common/inputs";
import styles from "./content.module";
import Constants from "../../../../constants";

const AdminStatistics = () => {
  const siteApi = new SiteApi();

  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState([]);

  const [typeDelay, setTypeDelay] = useState("seconds");
  const [delay, setDelay] = useState(6);
  const [dots, setDots] = useState(20);

  const [chart, setChart] = useState();

  useEffect(() => {
    const interval = setInterval(() => setIsLoading(true), 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isLoading) {
        const stat = Object.assign(
          await siteApi.getStatistics(),
          await siteApi.getAdminStatistics()
        );
        stat.date = new Date();
        statistics.push(stat);

        setChart(
          StatisticsService.getCommonStatistics(
            statistics,
            delay,
            typeDelay,
            dots
          )
        );
        setStatistics(statistics);
        setIsLoading(false);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.statistics}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Статистика: </div>
        </div>
        <div className={styles.dots}>
          <ComboBox
            name="dots"
            subTittle="Точек"
            value={dots}
            values={Constants.CountDots}
            setValue={setDots}
          />
        </div>
        <div className={styles.delay}>
          <ComboBox
            name="delay"
            value={delay}
            values={Constants.CommonTimeDelays}
            setValue={setDelay}
          />
          <ComboBox
            name="type-delay"
            value={typeDelay}
            values={Constants.CommonTypeTimeDelays}
            setValue={setTypeDelay}
          />
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <div className={styles.chart}>
          <div className={styles.tittle}>Основная статистика</div>
          <div className={styles.inner}>{chart}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
