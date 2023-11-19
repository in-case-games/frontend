import React from "react";
import { Helmet } from "react-helmet";
import { Reviews } from "../../components/structure";
import { Display, Content } from "./components";
import styles from "./box.module";

class Box extends React.Component {
  render() {
    return (
      <div className={styles.box}>
        <Helmet>
          <title>InCase - Кейс</title>
        </Helmet>
        <div className={styles.container_small}>
          <Display />
          <Content />
          <Reviews />
        </div>
      </div>
    );
  }
}

export default Box;
