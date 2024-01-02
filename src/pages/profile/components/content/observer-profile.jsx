import React, { useState } from "react";
import {
  AirplaneBlack as Airplane,
  CrossBlack as Cross,
} from "../../../../assets/images/icons";
import { Modal as ModalLayout } from "../../../../layouts";
import {
  LoadImage as LoadImageWindow,
  EmailSend as EmailSendWindow,
} from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Email as EmailApi, User as UserApi } from "../../../../api";
import { Input } from "../../../../components/common/inputs";
import { Observer as ProfileSettings } from "../../../../components/profile-settings";
import styles from "./content.module";
import TokenService from "../../../../services/token";

const ObserverProfile = () => {
  const emailApi = new EmailApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [isLoadImage, setIsLoadImage] = useState(false);

  const [image, setImage] = useState();
  const [password, setPassword] = useState("");

  const [controller, setController] = useState(null);
  const [error, setError] = useState(false);

  const controllers = {
    email: async () => await emailApi.sendChangeEmail(password),
    login: async () => await emailApi.sendChangeLogin(password),
    password: async () => await emailApi.sendChangePassword(password),
    account_delete: async () => await emailApi.sendDeleteAccount(password),
  };

  const controllersName = {
    email: "Пароль для смены почты:",
    login: "Пароль для смены логина:",
    password: "Пароль для смены пароля:",
    account_delete: "Пароль для удаления аккаунта:",
  };

  const windows = {
    load_image: () => setIsLoadImage(true),
    email: () => setIsEmail(true),
    close: () => {
      setIsEmail(false);
      setIsLoadImage(false);
    },
  };

  const exchangeWindow = (window) => {
    setIsLoadImage(false);
    setIsEmail(false);

    windows[window]();
  };

  return (
    <div className={styles.observer_profile}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Мой профиль</div>
        </div>
        {controller ? (
          <div className={styles.profile_controller}>
            <div className={styles.password}>
              <Input
                subTittle={controllersName[controller]}
                name="password"
                placeholder="Пароль"
                value={password}
                maxLength={50}
                isError={error}
                setValue={setPassword}
                type="password"
              />
            </div>
            <img
              alt=""
              src={Airplane}
              className={styles.send}
              onClick={async () => {
                try {
                  await controllers[controller]();
                  setIsEmail(true);
                  setController(null);
                  setError(false);
                } catch (err) {
                  console.log(err);
                  setError(true);
                }
              }}
            />
            <img
              alt=""
              src={Cross}
              className={styles.cancel}
              onClick={() => {
                setPassword(null);
                setController(null);
                setError(false);
              }}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <ProfileSettings
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          exchangeWindow={exchangeWindow}
          setController={setController}
        />
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
              const userApi = new UserApi();
              await userApi.updateImage(image);
              TokenService.setUser(TokenService.getUser());
              setIsLoadImage(false);
            }
          }}
        />
      </ModalLayout>
      <ModalLayout isActive={isEmail} close={() => setIsEmail(false)}>
        <EmailSendWindow />
      </ModalLayout>
    </div>
  );
};

export default ObserverProfile;
