import { React, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { delete_cookie } from 'sfcookies'
import LoadingBig from '../../../components/сommon/loading-big'
import Email from "../../../services/api/email"
import TokenService from '../../../services/token'
import classes from "./handler.module.css"

//TODO Loading
const LoginHandler = () => {
		const emailApi = new Email();
		
		const navigate = useNavigate();
		const [isLoading, setIsLoading] = useState(false);
		const [isApply, setIsApply] = useState(false);
    const [searchParams] = useSearchParams();
		const [login, setLogin] = useState("");
		const [errorMessage, setErrorMessage] = useState("");

		const sendLogin = async () => {
				setIsLoading(true);
				const token = searchParams.get("token");

				if(!token) setErrorMessage("Токен не валидный, повторите все еще раз");
				else if(login) {
					try {
							await emailApi.sendConfirmLogin(login, token);
							TokenService.removeUser();
							delete_cookie("user-balance");
							setIsApply(true);
					}
					catch(err) {
							setErrorMessage(err.response.data.error.message);
					}
					finally {
					}
				}
				else setErrorMessage("Заполните все поля");

				setIsLoading(false);
		};

    return(
        <div className={classes.handler}>
						{
							isLoading ?
							<LoadingBig height="400px"/> : null
						}
						{
							!isLoading && !isApply ?
							<div className={classes.handler}>
								<h1 className={classes.tittle}>Подтвердите новый логин</h1>
								{errorMessage ? <div className={classes.error_message}>{errorMessage}</div> : null}
								<input 
										maxLength={50}
										className={classes.input_form} 
										placeholder="Новый логин" 
										value={login} 
										onInput={e => setLogin(e.target.value)}
										name="login"
								/>
								<div className={classes.btn_main} onClick={() => sendLogin()}>Отправить</div>
							</div> : null
						}
						{
							isApply ? 
							<div className={classes.message}>
								Ваш аккаунт сменил логин
								<div className={classes.btn_main} onClick={() => navigate("/#")}>
										На главную
								</div>
							</div> : null
						}
        </div>
    );
}

export default LoginHandler;