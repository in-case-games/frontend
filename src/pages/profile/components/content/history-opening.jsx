import React, { useState } from "react";
import {
  Inventory as InventoryLayout,
  Modal as ModalLayout,
} from "../../../../layouts";
import {
  Box as BoxWindow,
  Item as ItemWindow,
  LoadImage as LoadImageWindow,
  HistoryOpening as HistoryOpeningWindow,
} from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import {
  User as UserApi,
  Game as GameApi,
  Item as ItemApi,
  Box as BoxApi,
} from "../../../../api";
import { Opening as History } from "../../../../components/history";
import styles from "./content.module";

const HistoryOpening = () => {
  const userApi = new UserApi();
  const itemApi = new ItemApi();
  const boxApi = new BoxApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  const [games, setGames] = useState();
  const [user, setUser] = useState();
  const [history, setHistory] = useState();
  const [item, setItem] = useState();
  const [box, setBox] = useState();
  const [image, setImage] = useState();

  const additionalLoading = async (array, start, end) => {
    let loaded = [];
    const g = games || (await loadedGames());
    const u = user || (await loadedUser());

    for (let i = start; i < end; i++) {
      let h = array[i];
      let item = await itemApi.getById(h.itemId);
      let box = await boxApi.getById(h.boxId);
      item.gameId = g[item.game];
      item = await itemApi.pushImage(item);
      box = await boxApi.pushImage(box);
      h.item = item;
      h.box = box;
      h.user = u;
      loaded.push(h);
    }

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [];

    for (let j = start; j < end; j++) {
      const h = array[j];

      result.push(
        <History
          id={h.id}
          history={h}
          click={() => setHistory(h)}
          showItem={() => setItem(h.item)}
          showBox={() => setBox(h.box)}
          key={h.id}
        />
      );
    }

    return result;
  };

  const loadedUser = async () => {
    const user = await userApi.get();
    user.image = await userApi.getImage();

    setUser(user);

    return user;
  };

  const loadedGames = async () => {
    const games = {};
    const response = await gameApi.get();

    for (let i = 0; i < response.length; i++) {
      games[response[i].name] = response[i].id;
    }

    setGames(games);

    return games;
  };

  return (
    <div className={styles.history_opening}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>История открытия кейсов </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={userApi.getOpenings}
          quantityPerPage={6}
        />
      </div>
      <ModalLayout isActive={history} close={() => setHistory()}>
        <HistoryOpeningWindow
          history={history}
          setItem={setItem}
          setBox={setBox}
          close={() => setHistory()}
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

export default HistoryOpening;
