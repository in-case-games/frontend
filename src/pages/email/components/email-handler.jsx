import { React, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { delete_cookie } from 'sfcookies'
import LoadingBig from '../../../components/сommon/loading-big'
import Email from "../../../services/api/email"
import TokenService from '../../../services/token'
import classes from "./handler.module.css"

//TODO Loading
const EmailHandler = () => {
		const emailApi = new Email();
		
		const navigate = useNavigate();
		const [isLoading, setIsLoading] = useState(false);
		const [isApply, setIsApply] = useState(false);
    const [searchParams] = useSearchParams();
		const [email, setEmail] = useState("");
		const [errorMessage, setErrorMessage] = useState("");

		const sendEmail = async () => {
				setIsLoading(true);
				const token = searchParams.get("token");

				if(!token) setErrorMessage("Токен не валидный, повторите все еще раз");
				else if(email) {
					try {
							await emailApi.sendConfirmEmail(email, token);
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
								<h1 className={classes.tittle}>Подтвердите новую почту</h1>
								<div className={classes.error_message}>{errorMessage}</div>
								<input 
										maxLength={50}
										className={classes.input_form} 
										placeholder="Новая почта" 
										value={email} 
										type='email'
										onInput={e => setEmail(e.target.value)}
										name="email"
								/>
								<div className={classes.btn_main} onClick={() => sendEmail()}>Отправить</div>
						</div> : null
					}
					{
							isApply ? 
							<div className={classes.message}>
								Ваш аккаунт сменил почту
								<div className={classes.btn_main} onClick={() => navigate("/#")}>
										На главную
								</div>
							</div> : null
						}
			</div>
		);
}

export default EmailHandler;