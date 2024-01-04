import React from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import Constants from "../../../../constants";
import styles from "./list-lunge.module";

const ItemLunge = (props) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (window.location.href === Constants.SITE_URL + props.link)
      scroll.scrollToTop();
    else window.scrollTo(0, 0);

    navigate(props.link);
  };

  return (
    <a
      className={styles.item_lunge}
      onClick={handleClick}
      href={Constants.SITE_URL + props.link}
    >
      <img className={styles.item_icon} alt="" src={props.icon} />
      <div className={styles.item_tittle}>{props.text}</div>
    </a>
  );
};

export default React.memo(ItemLunge);
