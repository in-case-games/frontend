import React from "react"
import { LoadDropZone } from '../сommon/button'
import classes from "./modal.module.css"

const LoadImageWindow = (props) => {
    return (
        <div className={classes.load_img_window}>
            <div className={classes.load_img_content}>
                <LoadDropZone
                    file={props.file}
                    setFile={props.setFile}
                    sizeMb={1}
                    height={400}
                    width={400}
                    description={"JPG, JPEG, PNG (MAX. 400x400px | 1MB)"}
                />
                {
                    props.click ?
                        <button
                            className={props.file ? classes.send_button__active : classes.send_button} onClick={() => props.click()}
                            style={{ cursor: props.file ? "pointer" : "default" }}>
                            Отправить
                        </button> : null
                }
            </div>
        </div>
    )
}

export default LoadImageWindow