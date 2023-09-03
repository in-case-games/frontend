import React from "react"
import "./modal.css"

const Modal = ({active, clickChange, content}) => {
    return(
        <div className={active ? "modal active": "modal"} onMouseDown={() => clickChange("close")}>
            <p className="hidden_text">- Свернуть</p>
            <div className="modal__content" onMouseDown={e => e.stopPropagation()}>
                {content}
            </div>
        </div>
    )
}

export default Modal;