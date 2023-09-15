import { React, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { delete_cookie } from 'sfcookies'
import LoadingBig from '../../../components/сommon/loading-big'
import Email from "../../../services/api/email"
import TokenService from '../../../services/token'
import classes from "./handler.module.css"

//TODO Loading
const AccountDeleteHandler = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const email = new Email();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getToken = async () => {
            const token = searchParams.get("token");

            try {
                if(token) {
                    await email.sendConfirmDeleteAccount(searchParams.get("token"));
                    TokenService.removeUser();
                    delete_cookie("user-balance");
                }
                else setError("Токен не валидный, повторите все еще раз");
            }
            catch(err) {
                setError(err.response.data.error.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        getToken();
     });

    return(
        <div className={classes.handler}>
            {
                isLoading ? 
                <LoadingBig height="400px"/> : null
            }
            {
                error ? 
                <div className={classes.error_message}>
                    {error}
                    <div className={classes.btn_main} onClick={() => navigate("/#")}>
                        На главную
                    </div>
                </div>: null
            }
            {
                !error && !isLoading ? 
                <div className={classes.message}>
                    Ваш аккаунт будет удален в течении 30 дней с момента, того, как вы увидели это сообщение. Для отмены удаления, просто зайдите в аккаунт пока он не удален
                    <div className={classes.btn_main} onClick={() => navigate("/#")}>
                        На главную
                    </div>
                </div> : null
            }
        </div>
    );
}

export default AccountDeleteHandler;