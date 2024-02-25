import React from "react";
import { Helmet } from "react-helmet";
import { Banners, Reviews } from "../../components/structure";
import { Loader as BoxLoader } from "./components";
import styles from "./game.module";

const Game = () => (
  <div className={styles.game}>
    <Helmet>
      <title>InCase - Кейсы</title>
      <meta
        name="description"
        content="InCase кейсы по кс го, дота 2. Заходи поиграть на лучшем сайте, самые дорогие скины и превосходная рулетка. Мы возьмем всю работу с выводом и пополнением за вас."
      />
    </Helmet>
    <Banners />
    <div className={styles.container_small}>
      <BoxLoader />
      <Reviews />
    </div>
  </div>
);

export default Game;
