import React from "react";
import { Helmet } from "react-helmet";
import styles from "./info.module";
import { Panel as InfoPanel } from "./components";

class Info extends React.Component {
  render() {
    return (
      <div className={styles.info}>
        <Helmet>
          <title>InCase - Информация</title>
        </Helmet>
        <div className={styles.container_small}>
          <InfoPanel />
        </div>
      </div>
    );
  }
}

export default Info;
