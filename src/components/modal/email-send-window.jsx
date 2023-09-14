import React from "react"
import { LogoMen } from "../../assets/images/icon"
import classes from "./modal.module.css"

const EmailSendWindow = (props) => {
    return(
        <div className={classes.send_email_window}>
            <div className={classes.send_email_window_content}>
                <div className={classes.sub_message}>
                    <h1>InCase</h1>
                    Вам на почту отправлено сообщение. Зайдите и проверьте, возможно письмо попало в спам
                </div>
                <img alt="" href="/#" src={LogoMen}/>
            </div>
        </div>
    )
}

export default EmailSendWindow;