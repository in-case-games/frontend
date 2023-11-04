import React, { useEffect, useState } from "react";
import {
  GunWhite as Gun,
  InCoinWhite as InCoin,
} from "../../../assets/images/icons";
import { Item as ItemApi, Game as GameApi } from "../../../api";
import { Simple as Item } from "../../game-item";
import { LoadingArrow as Loading } from "../../loading";
import { Converter } from "../../../helpers/converter";
import { Input } from "../../common/inputs";
import styles from "./exchange.module";

const Exchange = (props) => {
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isClickItem, setIsClickItem] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  const [allowedCost, setAllowedCost] = useState(
    Math.floor(props.inventory.cost)
  );
  const [search, setSearch] = useState("");
  const [games, setGames] = useState(props.games);

  const [selectItems, setSelectItems] = useState({ items: [] });
  const [primaryItems, setPrimaryItems] = useState([]);
  const [showItems, setShowItems] = useState([]);

  const loadedGames = async () => {
    const games = {};
    const response = await gameApi.get();

    for (let i = 0; i < response.length; i++) {
      games[response[i].name] = response[i].id;
    }

    setGames(games);

    return games;
  };

  useEffect(() => {
    const interval = setInterval(() => setIsLoading(true), 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const loaded = async (isAllReload) => {
        setIsBanned(true);

        let primary = primaryItems;
        let cost = props.inventory.fixedCost;
        const g = games || (await loadedGames());

        if (isAllReload) {
          primary = await itemApi.get();
          setPrimaryItems(primary);
        }

        const ids = [];
        const show = [];

        selectItems.items.forEach((i) => {
          cost -= i.cost * i.count;
          ids.push(i.id);
        });

        const lowerSearch = search.toLowerCase();

        for (let i = 0; i < primary.length; i++) {
          let item = primary[i];
          item.gameId = g[item.game];
          item = await itemApi.pushImage(primary[i]);
          const lowerName = item.name.toLowerCase();
          const isStartsWith = lowerName.startsWith(lowerSearch);
          const isAllowed = item.cost <= cost || ids.indexOf(item.id) > -1;

          if (
            (lowerSearch !== "" && isStartsWith) ||
            (isAllowed && lowerSearch === "")
          )
            show.push(item);
        }

        setAllowedCost(cost);
        setShowItems(show);
      };
      if (!isBanned && (isLoading || isClickItem)) {
        loaded(isLoading);

        setIsClickItem(false);
        setIsLoading(false);
        setIsBanned(false);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const click = async () => {
    if (allowedCost >= 0) {
      const index = props.selectItems.items.findIndex(
        (s) => s.id === props.inventory.id
      );
      removeSelectItem(index);

      if (selectItems.items.length === 0)
        await itemApi.sell(props.inventory.id);
      else
        await itemApi.exchangeInventoryForItems(
          props.inventory.id,
          selectItems.items
        );

      props.close();
    }
  };

  const inputSearch = (value) => {
    if (!isLoading && !isBanned && !isClickItem) {
      const ids = [];
      const show = [];
      const lowerValue = value.toLowerCase();

      selectItems.items.forEach((i) => ids.push(i.id));

      primaryItems.forEach((i) => {
        const lowerName = i.name.toLowerCase();
        const isStartsWith = lowerName.startsWith(lowerValue);
        const isAllowed = i.cost <= allowedCost || ids.indexOf(i.id) > -1;

        if (
          (lowerValue !== "" && isStartsWith) ||
          (isAllowed && lowerValue === "")
        )
          show.push(i);
      });

      setSearch(value);
      setShowItems(show);
    }
  };

  const getCountItem = (item) => {
    let items = selectItems.items;

    const index = items.findIndex((i) => i.id === item.id);

    return index > -1 ? items[index].count : 0;
  };

  const getCountItems = () => {
    let count = 0;

    selectItems.items.forEach((i) => (count += i.count));

    return count;
  };

  const onChangeRange = (value, inv) => {
    const selected = selectItems.items;
    const item = selected.find((i) => i.id === inv.id);
    const index = selected.indexOf(item);

    value = Number(value);

    if (value > 10) value = 10;
    else if (value <= 0) value = 0;

    if (!item && getCountItems() <= 10 - value) {
      inv.count = value;
      selected.push(inv);
    } else if (item && value === 0) selected.splice(index, 1);
    else if (item && getCountItems() <= 10 - (value - selected[index].count))
      selected[index].count = value;

    setSelectItems((prev) => ({ ...prev, selected }));
    setIsClickItem(true);
  };

  const removeSelectItem = (index) => {
    if (index > -1) {
      let selected = props.selectItems.items;
      selected.splice(index, 1);
      props.setSelectItems((prev) => ({ ...prev, items: selected }));
    }
  };

  return (
    <div className={styles.exchange}>
      <div className={styles.exchange_content}>
        <div className={styles.exchange_header}>
          <div className={styles.loading}>
            <Loading isLoading={isLoading} click={() => {}} cursor="default" />
          </div>
          <div className={styles.tittle}>Обмен предметов</div>
        </div>
        <div className={styles.button_exchange} onClick={click}>
          {selectItems.length === 0 ? "Продать" : "Обменять"}
        </div>
        <div className={styles.delimiter}></div>
        <div className={styles.search}>
          <Input
            maxLength={50}
            placeholder="Название предмета"
            name="search-item"
            value={search}
            setValue={inputSearch}
          />
        </div>
        {showItems.length > 0 ? (
          <div
            className={styles.items}
            style={
              showItems.length > 3
                ? { overflowY: "scroll" }
                : { overflowY: "hidden" }
            }
          >
            {showItems.map((i) => (
              <Item
                id={i.id}
                item={i}
                isShowUpdate={true}
                isClickItem={isClickItem}
                selectItems={selectItems}
                setSelectItems={setSelectItems}
                select={() => {
                  const selected = selectItems.items;
                  const index = selected.findIndex((s) => s.id === i.id);

                  if (index === -1 && getCountItems() < 10) {
                    i.count = i.count || 1;
                    selected.push(i);
                  } else selected.splice(index, 1);

                  setSelectItems({ ...selectItems, items: selected });
                  setIsClickItem(true);
                }}
                sliderStripProps={{
                  value: () => getCountItem(i),
                  onChange: (v) => onChangeRange(v, i),
                }}
                key={i.id}
              />
            ))}
          </div>
        ) : (
          <div className={styles.not_found}>
            {search === ""
              ? "Предметы с такой ценой не найдены"
              : "Предметы не найдены"}
          </div>
        )}
        <div className={styles.delimiter}></div>
        <div className={styles.exchange_counters}>
          <div className={styles.counter} style={{ background: "green" }}>
            <div className={styles.counter_tittle}>{10 - getCountItems()}</div>
            <img src={Gun} alt="" />
          </div>
          {
            <div
              className={styles.counter}
              style={{ background: allowedCost >= 0 ? "green" : "red" }}
            >
              <div className={styles.counter_tittle}>
                {allowedCost >= 0 ? "+" : ""}
                {Converter.cutCost(allowedCost, (c) => Math.floor(c))}
              </div>
              <img src={InCoin} alt="" />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Exchange;