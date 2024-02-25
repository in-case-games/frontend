import { React, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import { Input } from "../../components/common/inputs";
import { Handler } from "../../helpers/handler";
import TokenService from "../../services/token";
import styles from "./account-change-login.module";

const AccountChangeLogin = () => {
  const emailApi = new EmailApi();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const [login, setLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    if (isSuccess) navigate("/#");

    await Handler.error(async () => {
      const token = searchParams.get("token");

      if (!token) setErrorMessage("Токен не валидный, повторите все еще раз");
      else if (login === "") setErrorMessage("Заполните все поля");
      else {
        await emailApi.confirmLogin(login, token);
        TokenService.removeUser();
        delete_cookie("user-balance");
        setIsSuccess(true);
      }

      setErrorMessage();
    });
  };

  return (
    <div className={styles.account_change_login}>
      <Helmet>
        <title>InCase - Смена логина</title>
        <meta
          name="description"
          content="InCase поменяем ваш логин на другой. Будьте уверены мы сделаем все качественно, открывайте кейсы и оставьте все хлопоты на нас."
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.tittle}>
        {!isSuccess ? "Подтвердите новый логин" : "Ваш аккаунт сменил логин"}
      </div>
      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
      {!isSuccess ? (
        <div className={styles.inputs}>
          <Input
            name="account-login"
            placeholder="Логин"
            value={login}
            setValue={setLogin}
          />
        </div>
      ) : null}
      <div className={styles.button_main} onClick={() => handleClick()}>
        {!isSuccess ? "Отправить" : "На главную"}
      </div>
    </div>
  );
};

export default AccountChangeLogin;
