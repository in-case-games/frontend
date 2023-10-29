import React, { useState } from "react";
import { CloudGray as Cloud } from "../../../../assets/images/icons";
import { Converter } from "../../../../helpers/converter";
import styles from "./load-drop-zone.module";

const LoadDropZone = (props) => {
  const [isDrag, setIsDrag] = useState(false);
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState(null);

  const getBorderColor = () => {
    if (error) return "red";
    return isDrag ? "#60daff91" : "gray";
  };

  const setFile = (f) => {
    setError(false);

    const isName = f.name.match(props.regular);
    const isSize = f.size / 1048576 < props.sizeMb;

    const img = new Image();

    img.onload = function () {
      const cvs = document.createElement("canvas");

      cvs.width = props.width;
      cvs.height = props.height;

      const context = cvs.getContext("2d", { alpha: true });

      context.drawImage(img, 0, 0, cvs.width, cvs.height);

      setFileName(Converter.cutString(f.name, 19));
      setError(false);
      props.setFile(cvs.toDataURL());
    };

    if (!isName || !isSize) setError(true);
    else img.src = URL.createObjectURL(f);
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setError(false);

    if (e.type === "dragenter" || e.type === "dragover") setIsDrag(true);
    else if (e.type === "dragleave") setIsDrag(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0])
      setFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  return (
    <div className={styles.load_drop_zone}>
      <label
        className={isDrag ? styles.drop_zone__hover : styles.drop_zone}
        htmlFor="drop-zone-file"
        onDragEnter={handleDrag}
        style={{ borderColor: getBorderColor() }}
      >
        <img
          alt=""
          className={styles.image}
          src={props.file ? props.file : Cloud}
          style={{
            height: props.height > 400 ? 400 : props.height,
            width: props.width > 400 ? 400 : props.width,
          }}
        />
        {!fileName ? (
          <div className={styles.message}>
            <b>Нажмите для загрузки</b>
            <br />
            или перетащите и отпустите
            <div className={styles.description}>{props.description}</div>
          </div>
        ) : (
          <div className={styles.message}>{fileName}</div>
        )}
        {isDrag && (
          <div
            className={styles.element}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </label>
      <input
        id="drop-zone-file"
        className={styles.file}
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(LoadDropZone);
