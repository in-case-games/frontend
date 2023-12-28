import React, { useState, useEffect, useRef } from "react";
import { Banner } from "../../banner";
import { Box as BoxApi } from "../../../api";
import { AutomaticDot } from "../../common/sliders";
import styles from "./banners.module";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const boxApi = new BoxApi();

  const windowWidth = useRef(window.innerWidth);
  const navigate = useNavigate();

  const [isStart, setIsStart] = useState(true);
  const [banners, setBanners] = useState([]);
  const [counter, setCounter] = useState(1);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        await errorHandler(async () => {
          setIsStart(false);
          const response = await boxApi.getBannersByIsActive(true);
          const result = [];

          for (let i = 0; i < response.length; i++) {
            let r = await boxApi.bannerPushImage(response[i]);
            result.push(
              <Banner
                image={r.image}
                click={() => navigate(`/box/${r.box.id}`)}
                key={r.id}
              />
            );
          }

          setBanners(result);
        });
      },
      isStart ? 100 : 5000
    );

    return () => clearInterval(interval);
  });

  const getMarginLeft = () => {
    const width = windowWidth.current > 1000 ? 1000 : windowWidth.current;

    return `${-width * (counter - 1)}px`;
  };

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
    <div className={styles.banners}>
      <div className={styles.banners_inner}>
        <div
          className={styles.inner}
          style={{
            marginLeft: getMarginLeft(),
          }}
        >
          {banners}
        </div>
        <AutomaticDot
          maxValue={banners.length}
          counter={counter}
          setCounter={setCounter}
        />
      </div>
    </div>
  );
};

export default Banners;
