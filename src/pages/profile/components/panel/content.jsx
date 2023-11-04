import React from "react";
import styles from "../../profile.module";
import {
  ObserverProfile as Profile,
  Inventory,
  HistoryOpening as Openings,
  HistoryPayment as Payments,
} from "../content";

const Content = (props) => {
  const dictionary = {
    profile: <Profile />,
    inventory: <Inventory />,
    history_opening: <Openings />,
    payment: <Payments />,
    withdrawn: "Вывод",
    promo_code: "promo",
    admin: "admin",
    admin_items: "admin-items",
    admin_box: "admin-box",
  };

  return (
    <div className={styles.panel_content}>
      {dictionary[props.content]
        ? dictionary[props.content]
        : dictionary["profile"]}
    </div>
  );
};

export default Content;
