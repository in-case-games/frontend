import { React, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Email as EmailApi } from "../../api";
import styles from "./account-confirm.module";
import TokenService from "../../services/token";

const AccountConfirm = () => {
  const navigate = useNavigate();

  const emailApi = new EmailApi();

  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isStart, setIsStart] = useState(true);

  const isAuth = () => {
    const token = TokenService.getAccessToken();

    return token !== null && token !== undefined;
  };

  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (isStart && !isAuth() && error === null) {
          setIsStart(false);

          const token = searchParams.get("token");

          if (token) {
            try {
              await emailApi.confirmAccount(searchParams.get("token"));
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
    <div className={styles.account_confirm}>
      {error ? <div className={styles.error}>{error}</div> : null}
      {!error && !isAuth() ? (
        <div className={styles.tittle}>Успешно произведен вход в аккаунт</div>
      ) : null}
      <div className={styles.button_back} onClick={() => navigate("/#")}>
        На главную
      </div>
    </div>
  );
};

export default AccountConfirm;
