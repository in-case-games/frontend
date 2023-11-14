import React from "react";
import styles from "../../profile.module";
import {
  ObserverProfile as Profile,
  Inventory,
  HistoryOpening as Openings,
  HistoryPayment as Payments,
  HistoryWithdrawn as Withdrawn,
  HistoryPromocode as Promocodes,
  Admin,
  AdminItems,
  AdminBoxes,
  AdminStatistics,
  AdminGroups,
} from "../content";

const Content = (props) => {
  const dictionary = {
    profile: <Profile />,
    inventory: <Inventory />,
    history_opening: <Openings />,
    payment: <Payments />,
    withdrawn: <Withdrawn />,
    promocode: <Promocodes />,
    admin: <Admin exchange={props.exchange} />,
    admin_items: <AdminItems exchange={props.exchange} />,
    admin_boxes: <AdminBoxes exchange={props.exchange} />,
    admin_promocodes: "admin-promocodes",
    admin_banners: "admin-banners",
    admin_groups: <AdminGroups />,
    admin_statistics: <AdminStatistics />,
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
