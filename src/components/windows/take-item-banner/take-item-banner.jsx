import React, { useState } from "react";
import { GunWhite as ItemIcon } from "../../../assets/images/icons";
import { User as UserApi } from "../../../api";
import { Small as Item } from "../../game-item";
import styles from "./take-item-banner.module";

const TakeItemBanner = (props) => {
  const userApi = new UserApi();

  const takeItem = async (id) => {
    if (props.pathBanner)
      await userApi.putPathBanner({
        id: props.pathBanner.id,
        itemId: id,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        boxId: props.boxId,
      });
    else
      await userApi.postPathBanner({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        itemId: id,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        boxId: props.boxId,
      });

    props.close();
  };

  return (
    <div className={styles.take_item_banner}>
      <div className={styles.banner_content}>
        <div className={styles.banner_header}>
          <div className={styles.tittle}>Выбор предмета</div>
        </div>
        <div className={styles.delimiter}></div>
        {props.items.length > 0 ? (
          <div
            className={styles.items}
            style={
              props.items.length > 3
                ? { overflowY: "scroll" }
                : { overflowY: "hidden" }
            }
          >
            {props.items.map((i) => (
              <Item
                id={i.id}
                item={i}
                showWindow={() => takeItem(i.id)}
                key={i.id}
              />
            ))}
          </div>
        ) : (
          <div className={styles.not_found}>Предметы не найдены</div>
        )}
        <div className={styles.delimiter}></div>
        <div className={styles.banner_counter}>
          <div className={styles.counter} style={{ background: "green" }}>
            <div className={styles.tittle}>
              {props.pathBanner?.numberSteps || 0}
            </div>
            <img src={ItemIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeItemBanner;
