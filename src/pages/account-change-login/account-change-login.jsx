import { React, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import TokenService from "../../services/token";
import styles from "./account-change-login.module";
import { Input } from "../../components/common/inputs";

const AccountChangeLogin = () => {
  const emailApi = new EmailApi();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const [login, setLogin] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (isSuccess) navigate("/#");

    const token = searchParams.get("token");
    let err = "";

    if (!token) err = "Токен не валидный, повторите все еще раз";
    else if (login === "") err = "Заполните все поля";
    else {
      try {
        await emailApi.confirmLogin(login, token);
        TokenService.removeUser();
        delete_cookie("user-balance");
        setIsSuccess(true);
      } catch (e) {
        err = e.response.data.error.message;
      }
    }

    setError(err);
  };

  return (
    <div className={styles.account_change_login}>
      <div className={styles.tittle}>
        {!isSuccess ? "Подтвердите новый логин" : "Ваш аккаунт сменил логин"}
      </div>
      {error ? <div className={styles.error}>{error}</div> : null}
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
