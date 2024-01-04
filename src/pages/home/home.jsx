import React from "react";
import { Helmet } from "react-helmet";
import { Banners, Games, Reviews } from "../../components/structure";
import styles from "./home.module";

const Home = () => (
  <div className={styles.home}>
    <Helmet>
      <title>InCase - Главная страница</title>
    </Helmet>
    <Banners />
    <div className={styles.container_small}>
      <Games />
      <Reviews />
    </div>
  </div>
);

export default Home;
