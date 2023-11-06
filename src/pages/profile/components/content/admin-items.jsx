import React, { useState } from "react";
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
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  const [game, setGame] = useState("csgo");
  const [name, setName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [games, setGames] = useState();
  const [gamesArray, setGamesArray] = useState();
  const [item, setItem] = useState();
  const [image, setImage] = useState();

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
    let result = [];

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
            setValue={(v) => {
              setName(v);
              setFilterName(game + v);
            }}
          />
        </div>
        <div className={styles.filter}>
          <ComboBox
            name="filter"
            isReadOnly={isLoading}
            value={game}
            values={gamesArray}
            setValue={(v) => {
              setGame(v);
              setFilterName(v + name);
            }}
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
          loadPrimary={itemApi.get}
          filter={(primary) => {
            let res = primary;

            res = res?.filter((p) => p.game === game);

            if (name !== "")
              res = res?.filter((p) => p.name.toLowerCase().startsWith(name));

            return res;
          }}
          filterName={filterName}
          quantityPerPage={2}
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
