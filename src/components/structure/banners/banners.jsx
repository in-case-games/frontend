import React, { useState, useEffect, useRef } from "react";
import { Banner } from "../../banner";
import { Box as BoxApi } from "../../../api";
import { AutomaticDot } from "../../common/sliders";
import styles from "./banners.module";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const windowWidth = useRef(window.innerWidth);
  const navigate = useNavigate();

  const boxApi = new BoxApi();

  const [isStart, setIsStart] = useState(true);
  const [banners, setBanners] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);
        const response = await boxApi.getBannersByIsActive(true);
        const result = [];

        for (let i = 0; i < response.length; i++) {
          let r = await boxApi.bannerPushImage(response[i]);
          result.push(
            <Banner
              image={r.image}
              click={() => navigate(`box/${r.box.id}`)}
              key={r.id}
            />
          );
        }

        setBanners(result);
      },
      isStart ? 100 : 50000
    );

    return () => clearInterval(interval);
  });

  const getMarginLeft = () => {
    const width = windowWidth.current > 1000 ? 1000 : windowWidth.current;

    return `${-width * (counter - 1)}px`;
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
