import React from "react";
import { Helmet } from "react-helmet";
import { Panel as InfoPanel } from "./components";
import styles from "./info.module";

const Info = () => (
  <div className={styles.info}>
    <Helmet>
      <title>InCase - Информация</title>
    </Helmet>
    <div className={styles.container_small}>
      <InfoPanel />
    </div>
  </div>
);

export default Info;
