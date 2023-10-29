import React from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { LogoMen } from "../../../../assets/images/main";
import styles from "./logo.module";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (window.location.href === `http://localhost:3000/`) scroll.scrollToTop();
    else window.scrollTo(0, 0);

    navigate("/");
  };
  return (
    <a
      className={styles.logo}
      onClick={handleClick}
      href={`http://localhost:3000/`}
    >
      <div className={styles.logo_img}>
        <img alt="" src={LogoMen}></img>
      </div>
      <div className={styles.logo_text}>InCase</div>
    </a>
  );
};

export default React.memo(Logo);
