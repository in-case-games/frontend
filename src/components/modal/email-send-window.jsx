import React, { useState } from "react"
import LoadingBig from '../сommon/loading-big'
import classes from "./modal.module.css"

const EmailSendWindow = (props) => {
    const [isLoading,] = useState(true);

    return(
        <div className={classes.send_email_window}>
            <div className={classes.send_email_window_content}>
                <div className={classes.tittle}>InCase</div>
                <div className={classes.sub_message}>
                    Вам на почту отправлено сообщение. Зайдите и проверьте, возможно письмо попало в спам
                </div>
                {
                    isLoading ?
                    <LoadingBig/> : null
                }
            </div>
        </div>
    )
}

export default EmailSendWindow;