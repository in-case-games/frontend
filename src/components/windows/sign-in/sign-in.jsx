import React, { useState } from "react";
import { Authentication as AuthApi } from "../../../api";
import styles from "./sign-in.module.scss";
import { Input } from "../../common/inputs";

const SignIn = (props) => {
  const authApi = new AuthApi();

  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await authApi.signIn(login, password);
      props.exchangeWindow("email");
    } catch (err) {
      setError(err.response.data.error.message);
    }
  };

  return (
    <div className={styles.sign_in}>
      <div className={styles.sign_in_content}>
        <div className={styles.content_header}>
          <div className={styles.tittle}>Вход</div>
          <div className={styles.error}>{error}</div>
        </div>
        <div className={styles.content_inputs}>
          <Input
            name="account-name"
            placeholder="Имя аккаунта/Email"
            value={login}
            setValue={setLogin}
          />
          <Input
            name="account-password"
            type="password"
            placeholder="Пароль"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className={styles.content_buttons}>
          <div className={styles.button_send} onClick={signIn}>
            Отправить
          </div>
          <div
            className={styles.button_not_account}
            onClick={() => props.exchangeWindow("sign_up")}
          >
            Нет аккаунта?
          </div>
          <div
            className={styles.button_forgot_password}
            onClick={() => props.exchangeWindow("forgot")}
          >
            Забыли пароль?
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
