import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal as ModalLayout } from "../../../../layouts";
import { LoadImage as LoadImageWindow } from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { User as UserApi } from "../../../../api";
import { Observed as ProfileSettings } from "../../../../components/profile-settings";
import styles from "./content.module";

const ObservedProfile = () => {
  const userApi = new UserApi();

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllReload, setIsAllReload] = useState(true);
  const [isLoadImage, setIsLoadImage] = useState(false);

  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  useEffect(() => {
    const func = async () => {
      await errorHandler(
        async () => {
          const temp = await userApi.getById(id);
          temp.image = await userApi.getImageByUserId(id);
          setUser(temp);
          setIsAllReload(true);
          setIsLoading(true);
        },
        async (ex) => {
          if (ex?.response?.status === 404) {
            navigate("/not-found");
          }
        }
      );
    };

    func();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!user) {
        await errorHandler(
          async () => {
            const temp = await userApi.getById(id);
            temp.image = await userApi.getImageByUserId(id);

            setUser(temp);
          },
          async () => {
            if (ex?.response?.status === 404) {
              navigate("/not-found");
            }
          }
        );
      }
    }, 100 + penaltyDelay);

    return () => clearInterval(interval);
  });

  const errorHandler = async (action, actionCatch = async () => {}) => {
    try {
      await action();
    } catch (ex) {
      console.log(ex);
      await actionCatch(ex);

      setErrorMessage(
        ex?.response?.status < 500 && ex?.response?.data?.error?.message
          ? ex.response.data.error.message
          : "Неизвестная ошибка"
      );
      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1000
      );
    }
  };

  return (
    <div className={styles.observed_profile}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Профиль пользователя</div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        {user ? (
          <ProfileSettings
            user={user}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isAllReload={isAllReload}
            setIsAllReload={setIsAllReload}
            showLoadImage={setIsLoadImage}
          />
        ) : null}
      </div>
      <ModalLayout isActive={isLoadImage} close={() => setIsLoadImage(false)}>
        <LoadImageWindow
          file={image}
          setFile={setImage}
          width={400}
          height={400}
          sizeMb={1}
          regular={/\.(jpg|jpeg|png)$/}
          description={"JPG, JPEG, PNG (MAX. 400x400px | 1MB)"}
          click={async () => {
            if (image) {
              await userApi.updateImageByAdmin(id, image);
              window.location.reload();
            }
          }}
        />
      </ModalLayout>
    </div>
  );
};

export default ObservedProfile;
