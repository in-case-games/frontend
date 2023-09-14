import { React, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { delete_cookie } from 'sfcookies'
import Email from "../../../services/api/email"
import TokenService from '../../../services/token'
import classes from "./handler.module.css"

//TODO Loading
const EmailHandler = () => {
		const emailApi = new Email();
		
    const [searchParams] = useSearchParams();
		const [email, setEmail] = useState("");
		const [errorMessage, setErrorMessage] = useState("");

		const sendEmail = async () => {
				const token = searchParams.get("token");

				if(!token) setErrorMessage("Токен не валидный, повторите все еще раз");
				else if(email) {
					try {
							await emailApi.sendConfirmEmail(email, token);
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
						<h1>Подтвердите новую почту</h1>
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
        </div>
    );
}

export default EmailHandler;