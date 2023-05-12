import React from "react";
import classes from "./modal.module.css";
import { LogoMen } from "../../assets/images/icon";

const EmailSendWindow = (props) => {

    return(
        <div className={classes.send_email_window}>
            <div className={classes.send_email_window_content}>
                <div className={classes.sub_message}>
                    <h1>InCase</h1>
                    Вам на почту отправлено сообщение. Нажмите на кнопку подтверждения для того, чтобы нам убедиться, что это ваша почта.
                </div>
                <img alt="" href="/#" src={LogoMen}/>
            </div>
        </div>
    )
}

export default EmailSendWindow;