import React from "react"
import "./modal.css"

const Modal = ({active, setActive}) => {
    return(
        <div className={active ? "modal active": "modal"} onClick={() => setActive(false)}>
            <div onClick={e => e.stopPropagation()}>

            </div>
        </div>
    )
}

export default Modal;