import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./display.module";

const Display = () => {
  let { id } = useParams();

  return <div className={styles.display}></div>;
};

export default Display;
