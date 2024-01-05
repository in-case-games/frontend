import React from "react";
import { Footer, Header, OpeningsRoulette } from "../../components/structure";
import { LogoMen as Background } from "../../assets/images/main";
import { Notifications } from "../../components/structure/notification";
import styles from "./main.module";

const Main = ({ children }) => (
  <div className={styles.wrapper}>
    <Notifications />
    <Header />
    <main>
      <div className={styles.container}>
        <OpeningsRoulette />
      </div>
      {children}
    </main>
    <Footer />
    <img src={Background} id={styles.background_absolute} alt="bg-man" />
  </div>
);

export default Main;
