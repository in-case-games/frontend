import React, { useEffect, useState } from "react";
import { Box as BoxApi } from "../../../api";
import { Input } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import { TemplateBanner as BannerImage } from "../../../assets/images/main";
import styles from "./banner.module";

const Banner = (props) => {
  const boxApi = new BoxApi();

  const [banner, setBanner] = useState();
  const [box, setBox] = useState();
  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!banner && props.banner?.id) {
        await errorHandler(async () => {
          const result = await boxApi.bannerPushImage(
            await boxApi.getBannerById(props.banner.id)
          );
          setBanner(result);
          setBox(result?.box?.name);
        });
      }
    }, 100 + penaltyDelay);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation) {
        let temp = backOperation - 1;
        temp = temp >= 0 ? temp : 0;

        setBackOperation(temp);

        if (temp === 0) {
          await errorHandler(async () => {
            await operations[operation]();
          });

          setOperation(null);
          setBackOperation(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const buttonClick = async (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation();
      setOperation();
    } else if (!backOperation && box) {
      await errorHandler(
        async () => {
          const res = banner ? banner : {};
          res.image = props.image || null;
          res.boxId = (await boxApi.getByName(box)).id;
          res.expirationDate = new Date(banner.expirationDate || new Date());
          res.creationDate = new Date(banner.creationDate || new Date());

          if (isDelete) setOperation("delete-banner");
          else if (props.banner?.id) setOperation("update-banner");
          else setOperation("create-banner");

          setBackOperation(5);
          setBanner(res);
        },
        async () => {
          if (!banner?.image || banner?.image === BannerImage) {
            setErrorMessage("Загрузите фото");
            return true;
          }

          return false;
        }
      );
    }
  };

  const deleteBanner = async () => {
    await boxApi.deleteBanner(banner.id);

    setBanner();
    props.close();
  };

  const updateBanner = async () => {
    const res = await boxApi.putBanner(banner);

    props.setBanner(res);
    setBanner();
  };

  const createBanner = async () => {
    const res = await boxApi.postBanner(banner);

    props.setBanner(res);
    setBanner();
  };

  const operations = {
    "create-banner": createBanner,
    "delete-banner": deleteBanner,
    "update-banner": updateBanner,
  };

  const errorHandler = async (action, actionCatch = async () => false) => {
    try {
      await action();
    } catch (ex) {
      console.log(ex);

      if (await actionCatch()) {
        setErrorMessage(
          ex?.response?.status < 500 && ex?.response?.data?.error?.message
            ? ex.response.data.error.message
            : "Неизвестная ошибка"
        );
      }

      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1000
      );
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.banner_content}>
        <div className={styles.banner_header}>
          <div className={styles.tittle}>Баннер</div>
        </div>
        <div className={styles.error}>{errorMessage}</div>
        <div className={styles.banner_info}>
          <div className={styles.banner_display}>
            <img
              className={styles.image}
              onClick={() => props.openLoadWindow(true)}
              src={props.image || banner?.image || BannerImage}
            />
          </div>
          <Input
            name="banner-box"
            placeholder="Название кейса"
            subTittle="Кейса:"
            isReadOnly={banner?.id}
            value={box}
            setValue={(value) => setBox(value)}
          />
          <Input
            name="banner-creation-date"
            subTittle="Дата создания:"
            placeholder="Дата создания"
            isReadOnly={true}
            type="datetime-local"
            value={Converter.getDateIso(
              new Date(banner?.creationDate || new Date()).toISOString()
            )}
            setValue={(value) => setBanner({ ...banner, creationDate: value })}
          />
          <Input
            name="banner-expiration-date"
            subTittle="Дата истечения:"
            placeholder="Дата истечения"
            isReadOnly={false}
            type="datetime-local"
            value={Converter.getDateIso(
              new Date(banner?.expirationDate || new Date()).toISOString()
            )}
            setValue={(value) =>
              setBanner({ ...banner, expirationDate: value })
            }
          />
          <div className={styles.delimiter}></div>
          <div className={styles.buttons}>
            {!backOperation ? (
              <div
                className={styles.button_send}
                onClick={async () => await buttonClick()}
              >
                {banner?.id ? "Изменить" : "Создать"}
              </div>
            ) : null}
            {banner?.id && !backOperation ? (
              <div
                className={styles.button_delete}
                onClick={async () => await buttonClick(true)}
              >
                Удалить
              </div>
            ) : null}
            {backOperation ? (
              <div
                className={styles.button_back}
                onClick={async () => await buttonClick()}
              >
                <div className={styles.text}>Вернуть</div>
                <div className={styles.timer}>{backOperation}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
