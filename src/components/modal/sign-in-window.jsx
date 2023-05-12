import React, { useState } from "react";
import classes from "./modal.module.css";
import { LogoMen } from "../../assets/images/icon";
import Authentication from "../../services/api/authentication";

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
            <div className={classes.sign_in_window_content}>
                <form className={classes.sign_in_window_content__form}>
                    <p>Вход</p>
                    <div className={classes.error_message}>{errorMessage}</div>
                    <input className={classes.input_form} placeholder="Имя аккаунта/Email" value={login} onInput={e => setLogin(e.target.value)}/>
                    <input className={classes.input_form} placeholder="Пароль" type="password" value={password} onInput={e => setPassword(e.target.value)}/>
                    <div className={classes.btn_main} onClick={sendLogin}>
                        Отправить
                    </div>
                    <div className={classes.btn_secondary} onClick={() => props.clickChange("signup")}>
                        <div>Нет аккаунта?</div>
                    </div>
                </form>
                <img alt="" href="/#" src={LogoMen}/>
            </div>
        </div>
    )
}

export default SignInWindow;