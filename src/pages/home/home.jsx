import React from "react";
import { Helmet } from "react-helmet";
import styles from "./home.module";
import { Banners, Games, Reviews } from "../../components/structure";

class Home extends React.Component {
  render() {
    return (
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
  }
}

export default Home;
