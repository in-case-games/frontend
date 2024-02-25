import React from "react";
import { Helmet } from "react-helmet";
import { Banners, Games, Reviews } from "../../components/structure";
import styles from "./home.module";

const Home = () => (
  <div className={styles.home}>
    <Helmet>
      <title>InCase - Кейсы CsGo и Dota 2. Лучший дроп, получай призы.</title>
      <meta
        name="description"
        content="InCase кейсы по кс го, дота 2. Заходи поиграть на лучшем сайте, самые дорогие скины и превосходная рулетка. Мы возьмем всю работу с выводом и пополнением за вас."
      />
    </Helmet>
    <Banners />
    <div className={styles.container_small}>
      <Games />
      <Reviews />
    </div>
  </div>
);

export default Home;
