import React from "react"
import classes from "./modal.module.css"

const LoadImageWindow = (props) => {
    return(
        <div className={classes.load_img_window}>
            <div className={classes.load_img_content}>
								Здесь будет загрузка
            </div>
        </div>
    )
}

export default LoadImageWindow;