import React from "react";
import { Helmet } from "react-helmet";
import { Banners, Reviews } from "../../components/structure";
import { Loader as BoxLoader } from "./components";
import styles from "./game.module";

class Game extends React.Component {
  render() {
    return (
      <div className={styles.game}>
        <Helmet>
          <title>InCase - Кейсы</title>
        </Helmet>
        <Banners />
        <div className={styles.container_small}>
          <BoxLoader />
          <Reviews />
        </div>
      </div>
    );
  }
}

export default Game;
