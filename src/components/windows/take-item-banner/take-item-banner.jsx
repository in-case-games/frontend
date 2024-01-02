import React, { useState } from "react";
import { GunWhite as ItemIcon } from "../../../assets/images/icons";
import { User as UserApi } from "../../../api";
import { Small as Item } from "../../game-item";
import { Handler } from "../../../helpers/handler";
import TokenService from "../../../services/token";
import styles from "./take-item-banner.module";

const TakeItemBanner = (props) => {
  const userApi = new UserApi();
  const role = TokenService.getUser()?.role;

  const [hovered, setHovered] = useState(false);

  const takeItem = async (id) =>
    await Handler.error(async () => {
      if (!role) return;

      if (props.pathBanner) {
        if (props.pathBanner.item.id === id) return;

        await userApi.putPathBanner({
          id: props.pathBanner.id,
          itemId: id,
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          boxId: props.boxId,
        });
      } else {
        await userApi.postPathBanner({
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          itemId: id,
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          boxId: props.boxId,
        });
      }

      props.close();
    });

  const deletePath = async () =>
    await Handler.error(async () => {
      await userApi.deletePathBannerById(props.pathBanner.id);

      props.close();
    });

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
                isSelected={props.pathBanner?.item?.id === i.id}
                showWindow={() => takeItem(i.id)}
                key={i.id}
              />
            ))}
          </div>
        ) : (
          <div className={styles.not_found}>Предметы не найдены</div>
        )}
        <div className={styles.delimiter}></div>
        <div
          className={styles.banner_counter}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {!hovered || !props.pathBanner?.numberSteps ? (
            <div className={styles.counter} style={{ background: "green" }}>
              <div className={styles.tittle}>
                {props.pathBanner?.numberSteps || 0}
              </div>
              <img src={ItemIcon} alt="" />
            </div>
          ) : (
            <div
              className={styles.button_delete}
              style={{ background: "red" }}
              onClick={async () => await deletePath()}
            >
              ✕
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeItemBanner;
