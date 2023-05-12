import React, { useState } from "react";
import classes from "./modal.module.css"
import {ManLogoNoBg} from "../../assets/images/additional";
import { DocumentLink } from "../сommon/button";
import Authentication from "../../services/api/authentication";

const SignUpWindow = (props) => {
    const authApi = new Authentication();

    const [errorMessage, setErrorMessage] = useState("");
    const [isAgree, setIsAgree] = useState(false);
    const [is18Age, setIs18Age] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const sendRegister = async() => {
        if(!isAgree) {
            setErrorMessage("Примите пользовательское соглашение");
        }
        else if(!is18Age) {
            setErrorMessage("Примите если вам есть 18 лет");
        }
        else {
            try {
                await authApi.register(login, email, password);
                props.clickChange("email");
            
            } catch (err) {
                setErrorMessage(err.response.data.error.message);
            }
        }
    };

    return(
        <div className={classes.sign_up_window}>
            <div className={classes.sign_up_window_content}>
                <img alt="" src={ManLogoNoBg}/>
                <form className={classes.sign_up_window_content__form}>
                    <p>Регистрация</p>
                    <div className={classes.error_message}>{errorMessage}</div>
                    <input className={classes.input_form} value={login} onInput={e => setLogin(e.target.value)} placeholder="Имя аккаунта"/>
                    <input className={classes.input_form} value={email} onInput={e => setEmail(e.target.value)} placeholder="E-mail" type="email"/>
                    <input className={classes.input_form} value={password} onInput={e => setPassword(e.target.value)} placeholder="Пароль" type="password"/>
                    <div className={classes.checkbox_section}>
                        <input type="checkbox" value="Admin" name="agree-eta" className={classes.checkbox_form} onChange={() => setIsAgree(!isAgree)}/>
                        <label className={classes.agree_eta} htmlFor="agree-eta">
                            {<DocumentLink text="Я согласен с условиями пользовательского соглашения" link="/info/user-agreement"/>}
                        </label>
                    </div>
                    <div className={classes.checkbox_section}>
                        <input type="checkbox" value="Admin" name="agree-eta" className={classes.checkbox_form} onChange={() => setIs18Age(!is18Age)}/>
                        <label className={classes.agree_eta} htmlFor="agree-eta">
                            {<DocumentLink text="Подтверждаю, что мне есть 18 лет" link="/info/user-agreement"/>}
                        </label>
                    </div>
                    <div className={classes.btn_main} onClick={sendRegister}>
                        Отправить
                    </div>
                    <div className={classes.btn_secondary} onClick={() => props.clickChange("signin")}>
                        <div>Войти в аккаунт</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpWindow;