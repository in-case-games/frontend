import React from "react";
import { Footer, Header, OpeningsRoulette } from "../../components/structure";
import { LogoMen as Background } from "../../assets/images/main";
import styles from "./main.module";

const Main = ({ children }) => {
  return (
    <div className={styles.wrapper}>
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
};

export default Main;
