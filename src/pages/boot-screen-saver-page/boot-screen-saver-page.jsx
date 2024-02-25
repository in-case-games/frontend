import React from "react";
import BootScreenSaver from "../../components/loading/boot-screen-saver";
import styles from "./boot-screen-saver-page.module";

const BootScreenSaverPage = () => (
  <div className={styles.boot_screen_saver}>
    <BootScreenSaver />
  </div>
);

export default React.memo(BootScreenSaverPage);
