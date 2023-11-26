import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box as BoxApi, Game as GameApi, Item as ItemApi } from "../../api";
import { Helmet } from "react-helmet";
import { Reviews } from "../../components/structure";
import { BoxItems } from "../../components/structure";
import { read_cookie } from "sfcookies";
import { Box as BoxDisplay, Item as ItemDisplay, Roulette } from "./components";
import TokenService from "../../services/token";
import styles from "./box.module";

const Box = () => {
  const boxApi = new BoxApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const navigate = useNavigate();
  const { id } = useParams();

  const [isStart, setIsStart] = useState(true);
  const [isRollingRoulette, setIsRollingRoulette] = useState(false);

  let [games, setGames] = useState();

  const [user, setUser] = useState();
  const [box, setBox] = useState();
  const [inventory, setInventory] = useState();
  const [winItem, setWinItem] = useState();
  const [banner, setBanner] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);

        const user = TokenService.getUser();

        if (user) user.balance = read_cookie("user-balance");

        if (!games) {
          games = await gameApi.get();
          setGames(games);
        }

        setUser(user);

        try {
          const result = [];
          const banner = await boxApi.getByIdBanner(id);
          const inventories = await boxApi.getInventory(id);
          let box =
            banner && banner?.box ? banner.box : await boxApi.getById(id);
          box.inventory = inventories.sort(
            (a, b) => a.chanceWining - b.chanceWining
          );
          box = await boxApi.pushImage(box);

          let gameId;

          for (let i = 0; i < inventories.length; i++) {
            const inv = inventories[i];
            gameId = gameId || games.find((g) => g.name === inv.item.game).id;
            inv.item.chanceWining = inv.chanceWining / 100000;
            inv.item.gameId = gameId;
            inv.item = await itemApi.pushImage(inv.item);
            result.push(inv);
          }

          setBox(box);
          setBanner(banner);
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
      },
      isStart ? 100 : 5000
    );
    return () => clearInterval(interval);
  });

  const whatShow = () => {
    if (isRollingRoulette) return null;

    return winItem ? (
      <ItemDisplay item={winItem} goBack={() => setWinItem()} />
    ) : (
      <BoxDisplay box={box} isHasBanner={banner} />
    );
  };

  return (
    <div className={styles.box}>
      <Helmet>
        <title>InCase - Кейс</title>
      </Helmet>
      <div className={styles.container_small}>
        <div className={styles.display}>
          {whatShow()}
          <Roulette
            box={box}
            user={user}
            isRollingRoulette={isRollingRoulette}
            setWinItem={setWinItem}
            setIsRollingRoulette={setIsRollingRoulette}
          />
        </div>
        <div className={styles.content}>
          {inventory ? <BoxItems items={inventory} /> : null}
        </div>
        <Reviews />
      </div>
    </div>
  );
};

export default Box;
