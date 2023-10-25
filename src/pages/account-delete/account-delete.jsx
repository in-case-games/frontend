import { React, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { Email as EmailApi } from "../../api";
import TokenService from "../../services/token";
import styles from "./account-delete.module";

const AccountDeleteHandler = () => {
  const navigate = useNavigate();

  const emailApi = new EmailApi();

  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const [isStart, setIsStart] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (isStart && !isSuccess && error === null) {
          setIsStart(false);

          const token = searchParams.get("token");

          if (token) {
            try {
              await emailApi.confirmDeleteAccount(searchParams.get("token"));
              TokenService.removeUser();
              delete_cookie("user-balance");

              setIsSuccess(true);
            } catch (err) {
              setError(err.response.data.error.message);
            }
          } else setError("Токен не валидный, повторите все еще раз");
        }
      },
      isStart ? 100 : 10000
    );

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.account_delete}>
      {error ? <div className={styles.error}>{error}</div> : null}
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
