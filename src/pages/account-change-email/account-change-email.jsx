import { React, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import { Input } from "../../components/common/inputs";
import { Handler } from "../../helpers/handler";
import TokenService from "../../services/token";
import styles from "./account-change-email.module";

const AccountChangeEmail = () => {
  const emailApi = new EmailApi();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleClick = async () => {
    if (isSuccess) navigate("/#");

    await Handler.error(async () => {
      const token = searchParams.get("token");

      if (!token) setErrorMessage("Токен не валидный, повторите все еще раз");
      else if (email === "") setErrorMessage("Заполните все поля");
      else {
        await emailApi.confirmEmail(email, token);
        TokenService.removeUser();
        delete_cookie("user-balance");
        setIsSuccess(true);
      }

      setErrorMessage();
    });
  };

  return (
    <div className={styles.account_change_email}>
      <div className={styles.tittle}>
        {!isSuccess ? "Подтвердите новую почту" : "Ваш аккаунт сменил почту"}
      </div>
      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
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
