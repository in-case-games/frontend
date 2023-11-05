import React, { useState } from "react";
import {
  Inventory as InventoryLayout,
  Modal as ModalLayout,
} from "../../../../layouts";
import {
  Item as ItemWindow,
  LoadImage as LoadImageWindow,
  HistoryWithdrawn as HistoryWithdrawnWindow,
} from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import {
  User as UserApi,
  Game as GameApi,
  Item as ItemApi,
} from "../../../../api";
import { Withdrawn as History } from "../../../../components/history";
import styles from "./content.module";

const HistoryWithdrawn = () => {
  const userApi = new UserApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  const [games, setGames] = useState();
  const [user, setUser] = useState();
  const [history, setHistory] = useState();
  const [item, setItem] = useState();
  const [image, setImage] = useState();

  const additionalLoading = async (array, start, end) => {
    let loaded = [];
    const g = games || (await loadedGames());
    const u = user || (await loadedUser());

    for (let i = start; i < end; i++) {
      let h = array[i];
      let item = await itemApi.getById(h.itemId);
      item.gameId = g[item.game];
      item = await itemApi.pushImage(item);
      h.item = item;
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
          <div className={styles.name}>История выведенных предметов: </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={userApi.getWithdrawn100Last}
          quantityPerPage={20}
        />
      </div>
      <ModalLayout isActive={history} close={() => setHistory()}>
        <HistoryWithdrawnWindow
          history={history}
          setItem={setItem}
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

export default HistoryWithdrawn;
