import React from "react";
import { LoadDropZone } from "../../common/inputs";
import styles from "./load-image.module";

const LoadImage = (props) => {
  return (
    <div className={styles.load_image}>
      <div className={styles.load_image_content}>
        <LoadDropZone
          file={props.file}
          setFile={props.setFile}
          sizeMb={props.sizeMb}
          width={props.width}
          height={props.height}
          regular={props.regular}
          description={props.description}
        />
        {props.click ? (
          <div
            className={
              props.file ? styles.button_send__active : styles.button_send
            }
            onClick={() => props.click()}
            style={{ cursor: props.file ? "pointer" : "default" }}
          >
            Отправить
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoadImage;
