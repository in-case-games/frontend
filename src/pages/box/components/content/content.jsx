import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box as BoxApi,
  Game as GameApi,
  Item as ItemApi,
} from "../../../../api";
import { BoxItems } from "../../../../components/structure";
import styles from "./content.module";

const Content = () => {
  const boxApi = new BoxApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const navigate = useNavigate();
  const { id } = useParams();

  const [isStart, setIsStart] = useState(true);
  const [inventory, setInventory] = useState();
  const [games, setGames] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (!games) setGames(await gameApi.get());
        else if (!inventory) {
          setIsStart(false);
          await loadInventory();
        }
      },
      isStart ? 100 : 5000
    );
    return () => clearInterval(interval);
  });

  const loadInventory = async () => {
    try {
      const inventories = await boxApi.getInventory(id);
      const result = [];

      let gameId;

      for (let i = 0; i < inventories.length; i++) {
        const inv = inventories[i];
        gameId = gameId || games.find((g) => g.name === inv.item.game).id;
        inv.item.gameId = gameId;
        inv.item = await itemApi.pushImage(inv.item);
        inv.item.chanceWining = inv.chanceWining / 100000;
        result.push(inv);
      }

      setInventory(result);
    } catch (ex) {
      console.log(ex);
      if (
        ex?.response?.data?.error?.code === 4 ||
        ex?.response?.data?.errors?.id
      ) {
        navigate("/not-found");
      }
    }
  };

  return (
    <div className={styles.content}>
      {inventory ? <BoxItems items={inventory} /> : null}
    </div>
  );
};

export default Content;
