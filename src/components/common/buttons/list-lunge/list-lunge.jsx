import React from "react";
import ItemLunge from "./item-lunge";
import styles from "./list-lunge.module";
import { ArrowBottom } from "../../../../assets/images/icons";

const ListLunge = (props) => {
  return (
    <div className={styles.list_lunge} onClick={() => props.setIsActive()}>
      <img className={styles.list_icon} alt="" src={props.icon} />
      <div className={styles.list_tittle}>{props.tittle}</div>
      {props.items ? (
        <img className={styles.lunge_icon} alt="" src={ArrowBottom} />
      ) : null}
      {props.isActive ? (
        <div className={styles.lunge_items}>
          {props.items?.map((i) => (
            <ItemLunge icon={i.icon} text={i.text} link={i.link} key={i.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ListLunge);
