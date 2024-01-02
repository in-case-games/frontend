import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TemplateItem as ItemImage,
  TemplateBox as BoxImage,
  TemplateUser as UserImage,
} from "../../../assets/images/main";
import { Game as GameApi, Item as ItemApi, Box as BoxApi } from "../../../api";
import { LoadingArrow as Loading } from "../../loading";
import { Input } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import { Handler } from "../../../helpers/handler";
import styles from "./history-opening.module";

const HistoryOpening = (props) => {
  const itemApi = new ItemApi();
  const gameApi = new GameApi();
  const boxApi = new BoxApi();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [penaltyDelay, setPenaltyDelay] = useState(0);
  const [item, setItem] = useState(props.history.item);
  const [box, setBox] = useState(props.history.box);
  const [games, setGames] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const temp = props.history;

      await Handler.error(
        async () => {
          if (!games && (!temp.box || !temp.item))
            setGames(await gameApi.get());
          if (isLoading && games) {
            if (!temp.box) {
              temp.box = await boxApi.getById(temp.boxId);
              temp.box = await boxApi.pushImage(temp.box);
            }
            if (!temp.item) {
              temp.item = await itemApi.getById(temp.itemId);
              temp.item.gameId = games.find(
                (g) => g.name === temp.item.game
              ).id;
              temp.item = await itemApi.pushImage(temp.item);
            }

            setBox(temp.box);
            setItem(temp.item);
            setIsLoading(false);
          }
        },
        undefined,
        undefined,
        penaltyDelay,
        setPenaltyDelay
      );

      if (temp.box && temp.item) setIsLoading(false);
    }, 500 + penaltyDelay);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.history_opening}>
      <div className={styles.opening_content}>
        <div className={styles.opening_header}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.tittle}>История открытия</div>
        </div>
        <div className={styles.opening_info}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <img
                alt=""
                src={props.history.user?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  navigate(`/profile/${props.history.user.id}`);
                  props.close();
                }}
              />
              <Input
                name="history-user"
                placeholder="Название пользователя"
                isReadOnly={true}
                value={props.history.user?.login}
              />
            </div>
            <div className={styles.input}>
              <img
                alt=""
                src={item?.image ?? ItemImage}
                className={styles.image}
                onClick={() => {
                  if (props.setItem) props.setItem(item);
                }}
              />
              <Input
                name="history-item"
                placeholder="Название предмета"
                isReadOnly={true}
                value={item?.name}
              />
            </div>
            <div className={styles.input}>
              <img
                alt=""
                src={box?.image ?? BoxImage}
                className={styles.image}
                onClick={() => {
                  if (props.setBox) props.setBox(box);
                }}
              />
              <Input
                name="history-box"
                placeholder="Название коробки"
                isReadOnly={true}
                value={box?.name}
              />
            </div>
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.additional_info}>
            <div className={styles.date}>
              {Converter.getMiniDate(props.history.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOpening;
