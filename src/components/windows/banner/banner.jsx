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

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!banner && props.banner?.id) {
        try {
          const result = await boxApi.bannerPushImage(
            await boxApi.getBannerById(props.banner.id)
          );
          setBox(result?.box?.name);
          setBanner(result);
        } catch (ex) {
          console.log(ex);

          if (
            ex?.response?.status < 500 &&
            ex?.response?.data?.error?.message
          ) {
            setErrorMessage(ex.response.data.error.message);
          } else {
            setErrorMessage("Неизвестная ошибка");
          }
        }
      }
    }, 100);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation) {
        let temp = backOperation - 1;
        temp = temp >= 0 ? temp : 0;

        setBackOperation(temp);

        if (temp === 0) {
          try {
            await operations[operation]();
          } catch (ex) {
            console.log(ex);

            if (
              ex?.response?.status < 500 &&
              ex?.response?.data?.error?.message
            ) {
              setErrorMessage(ex.response.data.error.message);
            } else {
              setErrorMessage("Неизвестная ошибка");
            }
          }

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
      try {
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
      } catch (ex) {
        console.log(ex);

        if (!banner?.image || banner?.image === BannerImage) {
          setErrorMessage("Загрузите фото");
        } else if (
          ex?.response?.status < 500 &&
          ex?.response?.data?.error?.message
        ) {
          setErrorMessage(ex.response.data.error.message);
        } else {
          setErrorMessage("Неизвестная ошибка");
        }
      }
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
