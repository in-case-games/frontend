import React, { useEffect, useState, useRef } from "react";
import {
  Item as ItemApi,
  User as UserApi,
  Game as GameApi,
} from "../../../api";
import { OpeningHistory as Item } from "../../game-item";
import styles from "./openings-roulette.module";
import { Modal as ModalLayout } from "../../../layouts";
import {
  MiniProfile as MiniProfileWindow,
  Item as ItemWindow,
  Box as BoxWindow,
  LoadImage as LoadImageWindow,
} from "../../windows";

const OpeningsRoulette = () => {
  const userApi = new UserApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const windowWidth = useRef(window.innerWidth);

  const [isStart, setIsStart] = useState(true);

  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [box, setBox] = useState(null);
  const [image, setImage] = useState(null);

  const [miniProfile, setMiniProfile] = useState(null);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);

        const url = window.location.href.split("/");
        let h = [];
        let items = [];

        if (url.at(-2) === "box") {
          try {
            h = await userApi.getRouletteOpeningsByBoxId(url.at(-1));
          } catch (err) {}
        }

        if (h.length === 0) h = await userApi.getRouletteOpenings();

        const maxItemsWindow = Math.floor(windowWidth.current / 160) + 1;

        h = h.slice(0, maxItemsWindow);

        for (let i = 0; i < h.length; i++) {
          h[i].item = await itemApi.getById(h[i].itemId);
          const game = await gameApi.getByName(h[i].item.game);
          h[i].item.gameId = game.id;
          h[i].item = await itemApi.pushImage(h[i].item);

          items.push(
            <Item
              history={h[i]}
              showMiniProfile={() => setMiniProfile(h[i].userId)}
              key={h[i].id}
            />
          );
        }

        setItems(items);
      },
      isStart ? 1000 : 5000
    );

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={styles.openings_roulette}>
      {items}
      <ModalLayout isActive={miniProfile} close={() => setMiniProfile(null)}>
        <MiniProfileWindow
          userId={miniProfile}
          openItemWindow={(item) => setItem(item)}
          openBoxWindow={(box) => setBox(box)}
          exchangeWindow={(id) => setMiniProfile(id)}
        />
      </ModalLayout>
      <ModalLayout
        isActive={item}
        close={() => {
          setItem(null);
          setImage(null);
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
          setBox(null);
          setImage(null);
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
