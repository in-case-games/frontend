import React, { useState } from "react"
import { ManLogoNoBg } from "../../assets/images/additional"
import Authentication from "../../services/api/authentication"
import { DocumentLink } from "../сommon/button"
import classes from "./modal.module.css"

const SignUpWindow = (props) => {
    const authApi = new Authentication()

    const [errorMessage, setErrorMessage] = useState("")
    const [isAgree, setIsAgree] = useState(false)
    const [is18Age, setIs18Age] = useState(false)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const sendRegister = async () => {
        if (!isAgree) {
            setErrorMessage("Примите пользовательское соглашение")
        }
        else if (!is18Age) {
            setErrorMessage("Примите если вам есть 18 лет")
        }
        else {
            try {
                await authApi.register(login, email, password)
                props.clickChange("email")

            } catch (err) {
                setErrorMessage(err.response.data.error.message)
            }
        }
    }

    return (
        <div className={classes.sign_up_window}>
            <div className={classes.sign_up_content}>
                <img alt="" src={ManLogoNoBg} />
                <div className={classes.items}>
                    <div className={classes.tittle}>Регистрация</div>
                    <div className={classes.error_message}>{errorMessage}</div>
                    <input className={classes.input_form} value={login} onInput={e => setLogin(e.target.value)} placeholder="Имя аккаунта" name="name-account" />
                    <input className={classes.input_form} value={email} onInput={e => setEmail(e.target.value)} placeholder="E-mail" type="email" name="email-account" />
                    <input className={classes.input_form} value={password} onInput={e => setPassword(e.target.value)} placeholder="Пароль" type="password" name="password-account" />
                    <div className={classes.checkbox_section}>
                        <input type="checkbox" className={classes.checkbox_form} onChange={() => setIsAgree(!isAgree)} name="agree-policy" />
                        <label className={classes.agree_eta}>
                            {<DocumentLink text="Я согласен с условиями пользовательского соглашения" link="/info/user-agreement" />}
                        </label>
                    </div>
                    <div className={classes.checkbox_section}>
                        <input type="checkbox" className={classes.checkbox_form} onChange={() => setIs18Age(!is18Age)} name="agree-policy-18" />
                        <label className={classes.agree_eta}>
                            {<DocumentLink text="Подтверждаю, что мне есть 18 лет" link="/info/user-agreement" />}
                        </label>
                    </div>
                    <div className={classes.btn_main} onClick={sendRegister}>
                        Отправить
                    </div>
                    <div className={classes.btn_secondary} onClick={() => props.clickChange("signin")}>
                        <div>Войти в аккаунт</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpWindow