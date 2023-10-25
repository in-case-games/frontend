import React, { useState } from "react";
import { Email as EmailApi } from "../../../api";
import styles from "./forgot-password.module";
import { Input } from "../../common/inputs";

const ForgotPassword = (props) => {
  const emailApi = new EmailApi();
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");

  const sendForgot = async () => {
    try {
      await emailApi.sendForgotPassword({
        login: login,
        email: email,
      });
      props.exchangeWindow("email");
    } catch (err) {
      setError(err.response.data.error.message);
    }
  };

  return (
    <div className={styles.forgot_password}>
      <div className={styles.forgot_password_content}>
        <div className={styles.forgot_password_header}>
          <div className={styles.tittle}>Забыли пароль?</div>
          <div className={styles.error}>{error}</div>
        </div>
        <div className={styles.forgot_password_inputs}>
          <Input
            name="account-login"
            placeholder="Логин"
            value={login}
            setValue={setLogin}
          />
          <Input
            name="account-email"
            placeholder="E-mail"
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className={styles.description}>
          Заполните любое поле, которое помните. Мы проверим существует ли такой
          аккаунт
        </div>
        <div className={styles.forgot_password_buttons}>
          <div className={styles.button_send} onClick={() => sendForgot()}>
            Отправить
          </div>
          <div
            className={styles.button_back}
            onClick={() => props.exchangeWindow("sign_in")}
          >
            Вспомнили?
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
