import { React, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import LoadingBig from '../../../components/сommon/loading-big'
import Email from "../../../services/api/email"
import classes from "./handler.module.css"

//TODO Loading
const SignInHandler = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const email = new Email();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getToken = async () => {
            const token = searchParams.get("token");

            try {
                if(token) await email.checkSignIn(searchParams.get("token"));
                else setError("Токен не валидный, повторите все еще раз");
            }
            catch(err) {
                setError(err.response.data.error.message);
            }
            finally {
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
                    Успешно произведен вход в аккаунт
                    <div className={classes.btn_main} onClick={() => navigate("/#")}>
                        На главную
                    </div>
                </div> : null
            }
        </div>
    );
}

export default SignInHandler;