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

      props.setFile(cvs.toDataURL());
    };

    if (!isName || !isSize) setError(true);
    else {
      setFileName(Converter.cutString(f.name, 19));
      setError(false);

      if (f.name.split(".")[1] === "png") {
        img.src = URL.createObjectURL(f);
      } else {
        const reader = new FileReader();

        reader.onload = function () {
          props.setFile(reader.result);
        };

        reader.readAsDataURL(f);
      }
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.isBlockedLoad) return;

    setError(false);

    if (e.type === "dragenter" || e.type === "dragover") setIsDrag(true);
    else if (e.type === "dragleave") setIsDrag(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.isBlockedLoad) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0])
      setFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (props.isBlockedLoad) return;
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const getSizeWhileMaintainingRation = () => {
    const difference = props.width / props.height;
    let height, width;

    if (difference >= 1) {
      width = props.width > 400 ? 400 : props.width;
      height = width / difference;
    } else {
      height = props.height > 400 ? 400 : props.height;
      width = height / difference;
    }

    return {
      height: height,
      width: width,
    };
  };

  return (
    <div className={styles.load_drop_zone}>
      <label
        className={isDrag ? styles.drop_zone__hover : styles.drop_zone}
        htmlFor="drop-zone-file"
        onDragEnter={handleDrag}
        style={{
          borderColor: getBorderColor(),
          cursor: props.isBlockedLoad ? "default" : "pointer",
        }}
      >
        <img
          alt=""
          className={styles.image}
          src={props.file ? props.file : Cloud}
          style={getSizeWhileMaintainingRation()}
        />
        {!props.isBlockedLoad && !fileName ? (
          <div className={styles.message}>
            <b>Нажмите для загрузки</b>
            <br />
            или перетащите и отпустите
            <div className={styles.description}>{props.description}</div>
          </div>
        ) : null}
        {!props.isBlockedLoad && fileName ? (
          <div className={styles.message}>{fileName}</div>
        ) : null}
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
        disabled={props.isBlockedLoad}
      />
    </div>
  );
};

export default React.memo(LoadDropZone);
