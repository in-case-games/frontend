import React, { useState } from "react"
import { Email } from '../../services/api'
import classes from "./modal.module.css"

const ForgotPasswordWindow = (props) => {
		const emailApi = new Email();
		const [errorMessage, setErrorMessage] = useState("");
		const [login, setLogin] = useState("");
		const [email, setEmail] = useState("");

		const sendForgot = async() => {
			try {
					await emailApi.sendForgotPassword({
						login: login,
						email: email
					});
					props.clickChange("email");
			} 
			catch (err) {
					setErrorMessage(err.response.data.error.message);
			}
		};

    return(
        <div className={classes.forgot_password_window}>
            <div className={classes.forgot_password_content}>
								<p className={classes.tittle}>Забыли пароль?</p>
                <div className={classes.error_message}>{errorMessage}</div>
								<input 
									className={classes.input_form} 
									placeholder="Логин" 
									value={login} 
									onInput={e => setLogin(e.target.value)} 
									name="account-login"
								/>
								<input 
									className={classes.input_form} 
									placeholder="Email" 
									value={email} 
									onInput={e => setEmail(e.target.value)} 
									name="account-email"
								/>
								<p>Можете заполнить любое поле, какое помните. Мы проверим существует ли такой аккаунт</p>
								<div className={classes.btn_main} onClick={() => sendForgot()}>Отправить</div>
								<div 
									className={classes.btn_secondary} 
									onClick={_ => props.clickChange("signin")}>Вспомнили?</div>
            </div>
        </div>
    )
}

export default ForgotPasswordWindow;