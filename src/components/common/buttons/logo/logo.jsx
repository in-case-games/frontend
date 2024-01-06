import React from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { LogoMen } from "../../../../assets/images/main";
import Constants from "../../../../constants";
import styles from "./logo.module";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (window.location.href === Constants.SITE_URL) scroll.scrollToTop();
    else window.scrollTo(0, 0);

    navigate("/");
  };
  return (
    <a className={styles.logo} onClick={handleClick} href={Constants.SITE_URL}>
      <div className={styles.logo_img}>
        <img alt="" src={LogoMen}></img>
      </div>
      <div className={styles.logo_text}>InCase</div>
    </a>
  );
};

export default React.memo(Logo);
