import React from "react"
import "./modal.css"

const Modal = ({active, setActive, content}) => {
    return(
        <div className={active ? "modal active": "modal"} onClick={() => setActive(false)}>
            <p className="hidden_text">- Свернуть</p>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {content}
            </div>
        </div>
    )
}

export default Modal;