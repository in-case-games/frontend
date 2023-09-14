import { React, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { delete_cookie } from 'sfcookies'
import Email from "../../../services/api/email"
import TokenService from '../../../services/token'
import classes from "./handler.module.css"

//TODO Loading
const LoginHandler = () => {
		const emailApi = new Email();
		
    const [searchParams] = useSearchParams();
		const [login, setLogin] = useState("");
		const [errorMessage, setErrorMessage] = useState("");

		const sendLogin = async () => {
				const token = searchParams.get("token");

				if(!token) setErrorMessage("Токен не валидный, повторите все еще раз");
				else if(login) {
					try {
							await emailApi.sendConfirmLogin(login, token);
							TokenService.removeUser();
							delete_cookie("user-balance");
					}
					catch(err) {
							setErrorMessage(err.response.data.error.message);
					}
				}
				else setErrorMessage("Заполните все поля");
		};

    return(
        <div className={classes.handler}>
						<h1>Подтвердите новый логин</h1>
						<div className={classes.error_message}>{errorMessage}</div>
						<input 
								maxLength={50}
								className={classes.input_form} 
								placeholder="Новый логин" 
								value={login} 
								onInput={e => setLogin(e.target.value)}
								name="login"
						/>
						<div className={classes.btn_main} onClick={() => sendLogin()}>Отправить</div>
        </div>
    );
}

export default LoginHandler;