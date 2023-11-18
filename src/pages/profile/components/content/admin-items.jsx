import React, { useState, useEffect } from "react";
import {
  Inventory as InventoryLayout,
  Modal as ModalLayout,
} from "../../../../layouts";
import {
  Item as ItemWindow,
  LoadImage as LoadImageWindow,
} from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Game as GameApi, Item as ItemApi } from "../../../../api";
import { Simple as Item } from "../../../../components/game-item";
import { ComboBox, Input } from "../../../../components/common/inputs";
import styles from "./content.module";

const AdminItems = (props) => {
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isStart, setIsStart] = useState(true);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  const [game, setGame] = useState("csgo");
  const [name, setName] = useState("");
  const [games, setGames] = useState();
  const [gamesArray, setGamesArray] = useState();
  const [item, setItem] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (isStart) {
          setIsStart(false);
          await loadedGames();
        }
      },
      isStart ? 50 : 10000
    );

    return () => clearInterval(interval);
  });

  const additionalLoading = async (array, start, end) => {
    const loaded = [];
    const g = games || (await loadedGames());

    for (let i = start; i < end; i++) {
      let item = array[i];
      item.gameId = g[game];
      item = await itemApi.pushImage(item);
      loaded.push(item);
    }

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [
      <Item id="1213" item={{}} showItem={() => setItem({})} key="1213" />,
    ];

    for (let j = start; j < end; j++) {
      const i = array[j];

      result.push(
        <Item id={i.id} item={i} showItem={() => setItem(i)} key={i.id} />
      );
    }

    return result;
  };

  const loadedGames = async () => {
    const games = {};
    const response = await gameApi.get();

    for (let i = 0; i < response.length; i++) {
      games[response[i].name] = response[i].id;
    }

    setGames(games);
    setGamesArray(response);

    return games;
  };

  return (
    <div className={styles.admin_items}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div
            className={styles.profile_back}
            onClick={() => props.exchange("admin")}
          >
            ←
          </div>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Игровые предметы: </div>
        </div>
        <div className={styles.input}>
          <Input
            name="item-name"
            placeholder="Название предмета"
            value={name}
            setValue={setName}
          />
        </div>
        <div className={styles.filter}>
          <ComboBox
            name="filter"
            isReadOnly={isLoading}
            value={game}
            values={gamesArray}
            setValue={setGame}
          />
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={async () =>
            games ? await itemApi.getByGameId(games[game]) : []
          }
          filter={(primary) => {
            let res = primary;

            if (name !== "")
              res = res?.filter((p) =>
                p.name.toLowerCase().startsWith(name.toLowerCase())
              );

            return res;
          }}
          filterName={game + name}
          quantityPerPage={19}
        />
      </div>
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

export default AdminItems;