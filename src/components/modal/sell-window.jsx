import React from "react"
import classes from "./modal.module.css"

const SellWindow = (props) => {
    return(
        <div className={classes.sell_window}>
            <div className={classes.sell_content}>
                <div className={classes.sub_message}>
										Sell
                </div>

								<div>
										{props.selectItems.items }
								</div>
            </div>
        </div>
    )
}

export default SellWindow;