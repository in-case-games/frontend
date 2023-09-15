import { React, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { delete_cookie } from 'sfcookies'
import LoadingBig from '../../../components/сommon/loading-big'
import Email from "../../../services/api/email"
import TokenService from '../../../services/token'
import classes from "./handler.module.css"

//TODO Loading
const PasswordHandler = () => {
		const emailApi = new Email();
		
		const navigate = useNavigate();
		const [isApply, setIsApply] = useState(false);
		const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
		const [password, setPassword] = useState("");
		const [confirmPassword, setConfirmPassword] = useState("");
		const [errorMessage, setErrorMessage] = useState("");

		const sendPassword = async () => {
				setIsLoading(true);

				const token = searchParams.get("token");

				if(!token) setErrorMessage("Токен не валидный, повторите все еще раз");
				else if(password !== confirmPassword) setErrorMessage("Пароли не сходятся");
				else if(password) {
					try {
							await emailApi.sendConfirmPassword(password, token);
							TokenService.removeUser();
							delete_cookie("user-balance");
							setIsApply(true);
					}
					catch(err) {
							setErrorMessage(err.response.data.error.message);
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
								<h1 className={classes.tittle}>Подтвердите новый пароль</h1>
								<div className={classes.error_message}>{errorMessage}</div>
								<input 
										maxLength={50}
										className={classes.input_form} 
										placeholder="Новый пароль" 
										value={password} 
										type='password'
										onInput={e => setPassword(e.target.value)}
										name="password"
								/>
								<input 
										maxLength={50}
										className={classes.input_form} 
										placeholder="Еще раз пароль" 
										value={confirmPassword} 
										type='password'
										onInput={e => setConfirmPassword(e.target.value)}
										name="password"
								/>
								<div className={classes.btn_main} onClick={() => sendPassword()}>Отправить</div>
						</div> : null
					}
					{
							isApply ? 
							<div className={classes.message}>
								Ваш аккаунт сменил пароль
								<div className={classes.btn_main} onClick={() => navigate("/#")}>
										На главную
								</div>
							</div> : null
						}
			</div>
		);
}

export default PasswordHandler;