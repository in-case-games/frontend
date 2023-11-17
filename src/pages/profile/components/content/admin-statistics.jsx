import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Site as SiteApi } from "../../../../api";
import { AdminCommon as ChartCommon } from "../../../../components/common/charts";
import styles from "./content.module";

const AdminStatistics = (props) => {
  const siteApi = new SiteApi();

  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState([]);

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
        const stats = statistics.slice(-3600);

        setStatistics(stats);
        setIsLoading(false);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.statistics}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div
            className={styles.profile_back}
            onClick={() => props.exchange("admin")}
          >
            ←
          </div>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Статистика: </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <ChartCommon isLoading={isLoading} statistics={statistics} />
      </div>
    </div>
  );
};

export default AdminStatistics;
