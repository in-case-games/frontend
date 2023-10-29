import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal as ModalLayout } from "../../../../layouts";
import { LoadImage as LoadImageWindow } from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { User as UserApi } from "../../../../api";
import { Observed as ProfileSettings } from "../../../../components/profile-settings";
import styles from "./content.module";

const ObservedProfile = () => {
  const userApi = new UserApi();

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllReload, setIsAllReload] = useState(true);
  const [isLoadImage, setIsLoadImage] = useState(false);

  const [image, setImage] = useState(null);

  useEffect(() => {
    const func = async () => {
      const temp = await userApi.getById(id);
      temp.image = await userApi.getImageByUserId(id);
      setUser(temp);
      setIsAllReload(true);
      setIsLoading(true);
    };

    func();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!user) {
        const temp = await userApi.getById(id);
        temp.image = await userApi.getImageByUserId(id);

        setUser(temp);
      }
    }, 100);

    return () => clearInterval(interval);
  });

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
          <div className={styles.name}>Профиль пользователя:</div>
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
