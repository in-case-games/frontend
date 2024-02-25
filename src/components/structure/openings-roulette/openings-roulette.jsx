import React, { useEffect, useState, useRef } from "react";
import {
  Item as ItemApi,
  User as UserApi,
  Game as GameApi,
} from "../../../api";
import { OpeningHistory as Item } from "../../game-item";
import { Modal as ModalLayout } from "../../../layouts";
import {
  MiniProfile as MiniProfileWindow,
  Item as ItemWindow,
  Box as BoxWindow,
  LoadImage as LoadImageWindow,
  Restriction as RestrictionWindow,
} from "../../windows";
import { Converter } from "../../../helpers/converter";
import { Handler } from "../../../helpers/handler";
import styles from "./openings-roulette.module";

const OpeningsRoulette = () => {
  const userApi = new UserApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const [width, setWidth] = useState(window.innerWidth);
  const [isStart, setIsStart] = useState(true);
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  const [items, setItems] = useState();
  const [games, setGames] = useState();
  const [item, setItem] = useState();
  const [box, setBox] = useState();
  const [image, setImage] = useState();
  const [restriction, setRestriction] = useState();

  const [miniProfile, setMiniProfile] = useState();
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        await Handler.error(
          async () => {
            setIsStart(false);

            const g = games || (await loadedGames());
            const history = await loadedHistory();
            const result = [];

            for (let i = 0; i < history.length; i++) {
              let h = await pushItemToHistory(history[i], g);

              result.push(
                <Item
                  history={h}
                  showMiniProfile={() => setMiniProfile(h.userId)}
                  key={h.id}
                />
              );
            }

            setItems(result);
          },
          undefined,
          undefined,
          penaltyDelay,
          setPenaltyDelay,
          "OPENINGS_ROULETTE"
        );
      },
      isStart ? 1000 + penaltyDelay : 5000 + penaltyDelay
    );

    return () => {
      clearInterval(interval);
    };
  });

  const loadedGames = async () => {
    const games = {};
    const response = await gameApi.get();

    for (let i = 0; i < response.length; i++) {
      games[response[i].name] = response[i].id;
    }

    setGames(games);

    return games;
  };

  const loadedHistory = async () => {
    let history = [];
    const url = window.location.href.split("/");

    if (url.at(-2) === "box") {
      try {
        history = await userApi.getRouletteOpeningsByBoxId(url.at(-1));
      } catch (err) {}
    }

    if (history.length === 0) history = await userApi.getRouletteOpenings();

    const maxItemsWindow = Math.floor(width.current / 160) + 1;

    history = history.slice(0, maxItemsWindow);

    return history;
  };

  const pushItemToHistory = async (history, games) => {
    if (items) {
      const f = items.find((i) => i.props.history.id === history.id)?.props
        ?.history?.item;

      if (f) history.item = f;
    }

    var now_utc = Converter.getUtcDate();

    if (
      !history.item ||
      !history.item?.image ||
      (history.item?.updateDate &&
        new Date(history.item?.updateDate) < new Date(now_utc - 300000))
    ) {
      history.item = await itemApi.getById(history.itemId);
      history.item.gameId = games[history.item.game];
      history.item = await itemApi.pushImage(history.item);
    }

    return history;
  };

  return (
    <div className={styles.openings_roulette}>
      {items}
      <ModalLayout isActive={miniProfile} close={() => setMiniProfile()}>
        <MiniProfileWindow
          userId={miniProfile}
          openRestrictionWindow={(r) => setRestriction(r)}
          openItemWindow={(item) => setItem(item)}
          openBoxWindow={(box) => setBox(box)}
          exchangeWindow={(id) => setMiniProfile(id)}
        />
      </ModalLayout>
      <ModalLayout isActive={restriction} close={() => setRestriction()}>
        <RestrictionWindow
          restriction={restriction}
          setRestriction={setRestriction}
          close={() => setRestriction()}
        />
      </ModalLayout>
      <ModalLayout
        isActive={item}
        close={() => {
          setItem();
          setImage();
        }}
      >
        <ItemWindow
          item={item}
          image={image}
          setImage={setImage}
          setItem={setItem}
          openLoadWindow={setIsOpenLoadWindow}
        />
      </ModalLayout>
      <ModalLayout
        isActive={box}
        close={() => {
          setBox();
          setImage();
        }}
      >
        <BoxWindow
          box={box}
          image={image}
          setImage={setImage}
          setBox={setBox}
          openLoadWindow={setIsOpenLoadWindow}
        />
      </ModalLayout>
      <ModalLayout
        isActive={isOpenLoadWindow}
        close={() => setIsOpenLoadWindow(false)}
      >
        <LoadImageWindow
          file={image}
          setFile={setImage}
          width={200}
          height={200}
          sizeMb={1}
          regular={/\.(png)$/}
          description={"PNG (MAX. 200x200px | 1MB)"}
        />
      </ModalLayout>
    </div>
  );
};

export default OpeningsRoulette;
