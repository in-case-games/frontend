import React, { useEffect, useState } from "react";
import {
  AccountBeige as AccountImage,
  BoxBeige as BoxImage,
  CartBeige as CartImage,
  InCoinBeige as InCoinImage,
  RadarBeige as RadarImage,
  StarBeige as StarImage,
} from "../../../../../assets/images/icons";
import { Site as SiteApi } from "../../../../../api";
import { Handler } from "../../../../../helpers/handler";
import Statistic from "./statistic";
import styles from "./statistics.module";

const Statistics = () => {
  const siteApi = new SiteApi();

  const [isStart, setIsStart] = useState(true);

  const [statistics, setStatistics] = useState(null);
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      async () =>
        await Handler.error(
          async () => {
            setIsStart(false);

            const response = await siteApi.getStatistics();

            setStatistics({
              reviews: response.reviews,
              users: response.users,
              boxes: response.lootBoxes,
              items: response.withdrawnItems,
              inCoins: response.withdrawnFunds,
              online: 0,
            });
          },
          undefined,
          undefined,
          penaltyDelay,
          setPenaltyDelay,
          "STATISTICS"
        ),
      isStart ? 100 + penaltyDelay : 5000 + penaltyDelay
    );

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={styles.statistics}>
      <div className={styles.statistics__wrapper}>
        <Statistic
          image={StarImage}
          number={statistics?.reviews ?? 0}
          tittle="отзывов"
        />
        <Statistic
          image={AccountImage}
          number={statistics?.users ?? 0}
          tittle="аккаунтов"
        />
        <Statistic
          image={BoxImage}
          number={statistics?.boxes ?? 0}
          tittle="кейсов"
        />
      </div>
      <div className={styles.statistics__wrapper}>
        <Statistic
          image={CartImage}
          number={statistics?.items ?? 0}
          tittle="предметов"
        />
        <Statistic
          image={InCoinImage}
          number={statistics?.inCoins ?? 0}
          tittle="инкоинов"
        />
        <Statistic
          image={RadarImage}
          number={statistics?.online ?? 0}
          tittle="онлайн"
        />
      </div>
    </div>
  );
};

export default React.memo(Statistics);
