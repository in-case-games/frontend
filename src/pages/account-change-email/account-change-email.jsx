import { React, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import TokenService from "../../services/token";
import styles from "./account-change-email.module";
import { Input } from "../../components/common/inputs";

const AccountChangeEmail = () => {
  const emailApi = new EmailApi();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (isSuccess) navigate("/#");

    const token = searchParams.get("token");
    let err = "";

    if (!token) err = "Токен не валидный, повторите все еще раз";
    else if (email === "") err = "Заполните все поля";
    else {
      try {
        await emailApi.confirmEmail(email, token);
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
    <div className={styles.account_change_email}>
      <div className={styles.tittle}>
        {!isSuccess ? "Подтвердите новую почту" : "Ваш аккаунт сменил почту"}
      </div>
      {error ? <div className={styles.error}>{error}</div> : null}
      {!isSuccess ? (
        <div className={styles.inputs}>
          <Input
            name="account-email"
            placeholder="E-mail"
            value={email}
            setValue={setEmail}
            type="email"
          />
        </div>
      ) : null}
      <div className={styles.button_main} onClick={() => handleClick()}>
        {!isSuccess ? "Отправить" : "На главную"}
      </div>
    </div>
  );
};

export default AccountChangeEmail;
