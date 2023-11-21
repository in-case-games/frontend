import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box as BoxApi } from "../../../../api";
import styles from "./display.module";

const Display = () => {
  const boxApi = new BoxApi();

  const navigate = useNavigate();
  const { id } = useParams();

  const [isStart, setIsStart] = useState(true);
  const [isRollingRoulette, setIsRollingRoulette] = useState(false);

  const [box, setBox] = useState();
  const [winItem, setWinItem] = useState();
  const [banner, setBanner] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (!box) {
          setIsStart(false);
          try {
            const banner = await boxApi.getByIdBanner(id);

            if (banner && banner?.box) setBox(banner.box);
            else setBox(await boxApi.getById(id));

            console.log(banner);
            setBanner(banner);
          } catch (ex) {
            console.log(ex);
            if (
              ex?.response?.data?.error?.code === 4 ||
              ex?.response?.data?.errors?.id
            ) {
              navigate("/not-found");
            }
          }
        }
      },
      isStart ? 100 : 5000
    );
    return () => clearInterval(interval);
  });

  return <div className={styles.display}></div>;
};

export default Display;
