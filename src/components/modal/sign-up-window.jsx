import React from "react";
import classes from "./modal.module.css"
import {ManLogoNoBg} from "../../assets/images/additional";
import { DocumentLink } from "../сommon/button";

const SignUpWindow = (props) => {
    return(
        <div className={classes.sign_in_window}>
            <div className={classes.sign_in_window_content}>
                <img alt="" src={ManLogoNoBg}/>
                <form className={classes.sign_in_window_content__form}>
                    <p>Регистрация</p>
                    <input className={classes.input_form} placeholder="Имя аккаунта"/>
                    <input className={classes.input_form} placeholder="E-mail" type="email"/>
                    <input className={classes.input_form} placeholder="Пароль" type="password"/>
                    <div className={classes.checkbox_section}>
                        <input type="checkbox" value="Admin" name="agree-eta" className={classes.checkbox_form}/>
                        <label className={classes.agree_eta} htmlFor="agree-eta">
                            {<DocumentLink text="Я согласен с условиями пользовательского соглашения" link="/info/user-agreement"/>}
                        </label>
                    </div>
                    <div className={classes.checkbox_section}>
                        <input type="checkbox" value="Admin" name="agree-eta" className={classes.checkbox_form}/>
                        <label className={classes.agree_eta} htmlFor="agree-eta">
                            {<DocumentLink text="Подтверждаю, что мне есть 18 лет" link="/info/user-agreement"/>}
                        </label>
                    </div>
                    <button className={classes.btn_main}>
                        <div>Отправить</div>
                    </button>
                    <div className={classes.btn_secondary} onClick={() => props.clickSignIn(true)}>
                        <div>Войти в аккаунт</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpWindow;