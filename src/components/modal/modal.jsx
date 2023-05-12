import React from "react"
import "./modal.css"

const Modal = ({active, clickChange, content}) => {
    return(
        <div className={active ? "modal active": "modal"} onClick={() => clickChange("close")}>
            <p className="hidden_text">- Свернуть</p>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {content}
            </div>
        </div>
    )
}

export default Modal;