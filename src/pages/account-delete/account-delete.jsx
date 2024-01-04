import { React, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import { Handler } from "../../helpers/handler";
import TokenService from "../../services/token";
import styles from "./account-delete.module";

const AccountDeleteHandler = () => {
  const emailApi = new EmailApi();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const [isStart, setIsStart] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (isStart && !isSuccess) {
          setIsStart(false);

          await Handler.error(async () => {
            const token = searchParams.get("token");

            if (token) {
              await emailApi.confirmDeleteAccount(searchParams.get("token"));
              TokenService.removeUser();
              delete_cookie("user-balance");

              setIsSuccess(true);
              setErrorMessage();
            } else {
              setErrorMessage("Токен не валидный, повторите все еще раз");
            }
          });
        }
      },
      isStart ? 100 : 10000
    );

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.account_delete}>
      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
      {isSuccess ? (
        <div className={styles.tittle}>
          Ваш аккаунт будет удален в течении 30 дней с момента, того, как вы
          увидели это сообщение. Для отмены удаления, просто зайдите в аккаунт
          пока он не удален
        </div>
      ) : null}
      <div className={styles.button_back} onClick={() => navigate("/#")}>
        На главную
      </div>
    </div>
  );
};

export default AccountDeleteHandler;
