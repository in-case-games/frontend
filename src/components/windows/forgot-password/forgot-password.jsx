import React, { useState } from "react";
import { Email as EmailApi } from "../../../api";
import { Input } from "../../common/inputs";
import { Handler } from "../../../helpers/handler";
import styles from "./forgot-password.module";

const ForgotPassword = (props) => {
  const emailApi = new EmailApi();
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");

  const sendForgot = async () =>
    await Handler.error(
      async () => {
        await emailApi.sendForgotPassword({
          login: login,
          email: email,
        });
        props.exchangeWindow("email");
      },
      undefined,
      setErrorMessage
    );

  return (
    <div className={styles.forgot_password}>
      <div className={styles.forgot_password_content}>
        <div className={styles.forgot_password_header}>
          <div className={styles.tittle}>Забыли пароль?</div>
          <div className={styles.error}>{errorMessage}</div>
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
