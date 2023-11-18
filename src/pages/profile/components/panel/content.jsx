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
  AdminBanners,
  AdminPromocodes,
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
    admin_promocodes: <AdminPromocodes exchange={props.exchange} />,
    admin_banners: <AdminBanners exchange={props.exchange} />,
    admin_groups: <AdminGroups exchange={props.exchange} />,
    admin_statistics: <AdminStatistics exchange={props.exchange} />,
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
