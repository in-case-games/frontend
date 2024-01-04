import React from "react";
import styles from "./modal.modules";

const Modal = ({ isActive, close, children }) =>
  isActive ? (
    <div className={styles.modal} onMouseDown={() => close()}>
      <p className={styles.modal_text}>- Свернуть</p>
      <div
        className={styles.modal_content}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;

export default Modal;
