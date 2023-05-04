import React from "react"
import classes from "./modal.module.css"
import { LogoMen } from "../../assets/images/icon"

const SignInWindow = (props) => {
    return(
        <div className={classes.sign_up_window}>
            <div className={classes.sign_up_window_content}>
                <form className={classes.sign_up_window_content__form}>
                    <p>Вход</p>
                    <input className={classes.input_form} placeholder="Имя аккаунта/Email"/>
                    <input className={classes.input_form} placeholder="Пароль" type="password"/>
                    <button className={classes.btn_main}>
                        <div>Отправить</div>
                    </button>
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