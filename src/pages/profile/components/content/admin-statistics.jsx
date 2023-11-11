import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Site as SiteApi } from "../../../../api";
import styles from "./content.module";

const AdminStatistics = () => {
  const siteApi = new SiteApi();

  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!statistics || isLoading) {
        const statistics = await siteApi.getAdminStatistics();
        console.log(statistics);
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
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}></div>
    </div>
  );
};

export default AdminStatistics;
