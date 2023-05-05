import React, { useState } from "react";
import classes from "./modal.module.css";
import { LogoMen } from "../../assets/images/icon";
import Authentication from "../../services/api/authentication";

const SignInWindow = (props) => {
    const authApi = new Authentication();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className={classes.sign_up_window}>
            <div className={classes.sign_up_window_content}>
                <form className={classes.sign_up_window_content__form}>
                    <p>Вход</p>
                    <input className={classes.input_form} placeholder="Имя аккаунта/Email" value={login} onInput={e => setLogin(e.target.value)}/>
                    <input className={classes.input_form} placeholder="Пароль" type="password" value={password} onInput={e => setPassword(e.target.value)}/>
                    <div className={classes.btn_main} onClick={async () => await authApi.login(login, password)}>
                        Отправить
                    </div>
                    <div className={classes.btn_secondary} onClick={() => props.clickSignIn(false)}>
                        <div>Нет аккаунта?</div>
                    </div>
                </form>
                <img alt="" href="/#" src={LogoMen}/>
            </div>
        </div>
    )
}

export default SignInWindow;