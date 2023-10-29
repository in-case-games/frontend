import { React, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import TokenService from "../../services/token";
import styles from "./account-change-password.module";
import { Input } from "../../components/common/inputs";

const AccountChangePassword = () => {
  const emailApi = new EmailApi();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (isSuccess) navigate("/#");

    const token = searchParams.get("token");
    let err = "";

    if (!token) err = "Токен не валидный, повторите все еще раз";
    else if (password === "" || confirmPassword === "")
      err = "Заполните все поля";
    else if (password !== confirmPassword)
      err = "Пароли не сходятся, скорее всего допустили ошибку";
    else {
      try {
        await emailApi.confirmPassword(password, token);
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
    <div className={styles.account_change_password}>
      <div className={styles.tittle}>
        {!isSuccess ? "Подтвердите новый пароль" : "Ваш аккаунт сменил пароль"}
      </div>
      {error ? <div className={styles.error}>{error}</div> : null}
      {!isSuccess ? (
        <div className={styles.inputs}>
          <Input
            name="account-password"
            placeholder="Пароль"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <Input
            name="account-confirm-password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            setValue={setConfirmPassword}
            type="password"
          />
        </div>
      ) : null}
      <div className={styles.button_main} onClick={() => handleClick()}>
        {!isSuccess ? "Отправить" : "На главную"}
      </div>
    </div>
  );
};

export default AccountChangePassword;
