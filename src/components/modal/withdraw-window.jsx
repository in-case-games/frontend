import React from "react"
import classes from "./modal.module.css"

const WithdrawWindow = (props) => {
    return(
        <div className={classes.withdraw_window}>
            <div className={classes.withdraw_content}>
                <div className={classes.sub_message}>
										Withdraw
                </div>
								<div>
										{(props.selectItem) ? props.selectItem : props.selectItems.items }
								</div>
            </div>
        </div>
    )
}

export default WithdrawWindow;