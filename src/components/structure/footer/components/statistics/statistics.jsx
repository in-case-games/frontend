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
import styles from "./statistics.module";
import Statistic from "./statistic";

const Statistics = () => {
  const siteApi = new SiteApi();

  const [isStart, setIsStart] = useState(true);

  const [errorMessage, setErrorMessage] = useState();
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        await errorHandler(async () => {
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
        });
      },
      isStart ? 100 : 5000
    );

    return () => {
      clearInterval(interval);
    };
  });

  const errorHandler = async (action) => {
    try {
      await action();
    } catch (ex) {
      console.log(ex);

      setErrorMessage(
        ex?.response?.status < 500 && ex?.response?.data?.error?.message
          ? ex.response.data.error.message
          : "Неизвестная ошибка"
      );
    }
  };

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
