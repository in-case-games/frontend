import React, { useState } from "react"
import { CloudGray } from '../../assets/images/icon'
import classes from "./modal.module.css"

const LoadImageWindow = (props) => {
    const [file, setFile] = useState();
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
    }

    const handleChange = e => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    }

    const handleSend = () => {
        if(file) {
            console.log(file);
        }
    }

    return(
        <div className={classes.load_img_window}>
            <div className={classes.load_img_content}>
                <label className={dragActive ? classes.dropzone_file__hover : classes.dropzone_file} htmlFor={classes.input_file} onDragEnter={handleDrag}>
                    <img alt="" src={CloudGray}/>
                    {
                        !file ?
                        <div className={classes.dropzone_message}>
                            <p><b>Нажмите для загрузки</b><br/>или перетащите и отпустите</p>
                            <p>SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div> : 
                        <div className={classes.dropzone_message}>
                            <p>{file.name.substring(0, 19) + (file.name.length > 20 ? "..." : "")}</p>
                        </div>
                    }
                    { 
                        dragActive && 
                        <div 
                            id={classes.drag_file_element} 
                            onDragEnter={handleDrag} 
                            onDragLeave={handleDrag} 
                            onDragOver={handleDrag} onDrop={handleDrop}>
                        </div> 
                    }
                </label>
                <input 
                    id={classes.input_file} 
                    type="file" 
                    style={{visibility: 'hidden'}}
                    onChange={handleChange}
                />
                <button className={file ? classes.send_button__active : classes.send_button} onClick={() => handleSend()}>
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default LoadImageWindow;