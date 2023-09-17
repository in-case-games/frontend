import React from "react"
import classes from "./modal.module.css"

const PaymentWindow = (props) => {

    return(
        <div className={classes.send_email_window}>
            <div className={classes.send_email_content}>
                <div className={classes.sub_message}>
                    Здесь будет оплата
                </div>
            </div>
        </div>
    )
}

export default PaymentWindow;