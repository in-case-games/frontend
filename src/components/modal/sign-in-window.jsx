import React, { useState } from "react"
import Authentication from "../../services/api/authentication"
import classes from "./modal.module.css"

const SignInWindow = (props) => {
    const authApi = new Authentication();
    
    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const sendLogin = async() => {
        try {
            await authApi.login(login, password);
            props.clickChange("email");
        } 
        catch (err) {
            setErrorMessage(err.response.data.error.message);
        }
    };

    return(
        <div className={classes.sign_in_window}>
            <div className={classes.sign_in_content}>
                <p className={classes.tittle}>Вход</p>
                <div className={classes.error_message}>{errorMessage}</div>
                <input className={classes.input_form} placeholder="Имя аккаунта/Email" value={login} onInput={e => setLogin(e.target.value)} name="account-email"/>
                <input className={classes.input_form} placeholder="Пароль" type="password" value={password} onInput={e => setPassword(e.target.value)} name="account-password"/>
                <div className={classes.btn_main} onClick={sendLogin}>Отправить</div>
                <div className={classes.btn_secondary} onClick={() => props.clickChange("signup")}>
                    Нет аккаунта?
                </div>
                <div className={classes.forgot_password} onClick={() => props.clickChange("forgot")}>Забыли пароль?</div>
            </div>
        </div>
    )
}

export default SignInWindow;