import React from "react";
import styles from "../../profile.module";
import {
  ObserverProfile as Profile,
  Inventory,
  HistoryOpening as Openings,
  HistoryPayment as Payments,
  HistoryWithdrawn,
  HistoryPromocode,
  Admin,
} from "../content";
import AdminItems from "../content/admin-items";

const Content = (props) => {
  const dictionary = {
    profile: <Profile />,
    inventory: <Inventory />,
    history_opening: <Openings />,
    payment: <Payments />,
    withdrawn: <HistoryWithdrawn />,
    promocode: <HistoryPromocode />,
    admin: <Admin exchange={props.exchange} />,
    admin_items: <AdminItems exchange={props.exchange} />,
    admin_boxes: "admin-boxes",
    admin_users: "admin-users",
    admin_promocodes: "admin-promocodes",
    admin_banners: "admin-banners",
    admin_groups: "admin-groups",
    admin_statistics: "admin-statistics",
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
