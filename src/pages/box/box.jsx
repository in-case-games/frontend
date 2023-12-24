import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box as BoxApi,
  Game as GameApi,
  Item as ItemApi,
  User as UserApi,
} from "../../api";
import { Helmet } from "react-helmet";
import { Reviews } from "../../components/structure";
import { BoxItems } from "../../components/structure";
import { read_cookie } from "sfcookies";
import { Box as BoxDisplay, Item as ItemDisplay, Roulette } from "./components";
import TokenService from "../../services/token";
import { Modal as ModalLayout } from "../../layouts";
import {
  TakeItemBanner as TakeItemBannerWindow,
  Box as BoxWindow,
  Item as ItemWindow,
  LoadImage as LoadImageWindow,
  BoxInventory as BoxInventoryWindow,
  Payment as PaymentWindow,
} from "../../components/windows";
import styles from "./box.module";

const Box = () => {
  const boxApi = new BoxApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();
  const userApi = new UserApi();

  const navigate = useNavigate();
  const { id } = useParams();
  const role = TokenService.getUser()?.role;

  const [isStart, setIsStart] = useState(true);
  const [isRollingRoulette, setIsRollingRoulette] = useState(false);
  const [isShowTakeItemWindow, setIsShowTakeItemWindow] = useState(false);
  const [isShowImageWindow, setIsShowImageWindow] = useState();
  const [isShowPaymentWindow, setIsShowPaymentWindow] = useState();
  const [showInventoryWindow, setShowInventoryWindow] = useState();
  const [showItemWindow, setShowItemWindow] = useState();
  const [showBoxWindow, setShowBoxWindow] = useState();
  const [image, setImage] = useState();

  let [games, setGames] = useState();

  const [user, setUser] = useState();
  const [box, setBox] = useState();
  const [inventory, setInventory] = useState();
  const [winItem, setWinItem] = useState();
  const [banner, setBanner] = useState();
  const [pathBanner, setPathBanner] = useState();

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
          const inventories = await boxApi.getInventory(id);
          let banner;
          let box;

          try {
            banner = await boxApi.getByIdBanner(id);
          } catch (ex) {}

          if (banner && banner?.box) {
            box = banner.box;
            try {
              setPathBanner(await userApi.getPathBannerByBoxId(box.id));
            } catch (ex) {
              setPathBanner();
            }

            if (new Date(banner.expirationDate) <= new Date())
              banner = undefined;
          } else box = await boxApi.getById(id);

          box.inventory = inventories.sort(
            (a, b) => a.chanceWining - b.chanceWining
          );
          box = await boxApi.pushImage(box);

          let gameId;

          if (role && role !== "user") result.push({ id: "1", boxId: box.id });

          for (let i = 0; i < inventories.length; i++) {
            const inv = inventories[i];
            gameId = gameId || games.find((g) => g.name === inv.item.game).id;
            inv.item.chanceWining = inv.chanceWining / 100000;
            inv.item.gameId = gameId;
            inv.item = await itemApi.pushImage(inv.item);
            inv.boxId = box.id;
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
      <ItemDisplay
        item={winItem}
        pathBanner={pathBanner}
        goBack={() => setWinItem()}
      />
    ) : (
      <BoxDisplay
        box={box}
        isHasBanner={banner}
        pathBanner={pathBanner}
        openBannerWindow={() => setIsShowTakeItemWindow(banner)}
      />
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
          {inventory && inventory.length > 1 ? (
            <Roulette
              box={box}
              user={user}
              isRollingRoulette={isRollingRoulette}
              pathBanner={pathBanner}
              setWinItem={async (i) => {
                try {
                  setPathBanner(await userApi.getPathBannerByBoxId(box.id));
                } catch (ex) {
                  setPathBanner();
                }

                setWinItem(i);
              }}
              setIsRollingRoulette={setIsRollingRoulette}
              setIsShowPayment={setIsShowPaymentWindow}
            />
          ) : null}
        </div>
        <div className={styles.content}>
          {inventory ? (
            <BoxItems
              items={inventory}
              showInventoryWindow={setShowInventoryWindow}
            />
          ) : null}
        </div>
        <Reviews />
      </div>
      <ModalLayout
        isActive={isShowTakeItemWindow}
        close={async () => {
          setIsShowTakeItemWindow();
          try {
            setPathBanner(await userApi.getPathBannerByBoxId(box.id));
          } catch (ex) {
            setPathBanner();
          }
        }}
      >
        <TakeItemBannerWindow
          items={
            inventory && inventory.length > 1
              ? inventory
                  .filter(
                    (i) =>
                      i?.item?.cost &&
                      i.item.cost > box.cost &&
                      i.item.cost < box.cost * 20
                  )
                  .map((i) => {
                    var item = JSON.parse(JSON.stringify(i.item));
                    item.chanceWining = null;
                    return item;
                  })
              : null
          }
          boxId={box?.id}
          pathBanner={pathBanner}
          close={async () => {
            setIsShowTakeItemWindow();
            try {
              setPathBanner(await userApi.getPathBannerByBoxId(box.id));
            } catch (ex) {
              setPathBanner();
            }
          }}
        />
      </ModalLayout>
      <ModalLayout
        isActive={showInventoryWindow}
        close={() => setShowInventoryWindow()}
      >
        <BoxInventoryWindow
          inventory={showInventoryWindow}
          setItem={setShowItemWindow}
          setBox={setShowBoxWindow}
          close={() => setShowInventoryWindow()}
        />
      </ModalLayout>
      <ModalLayout
        isActive={showItemWindow}
        close={() => {
          setShowItemWindow();
          setImage();
        }}
      >
        <ItemWindow
          item={showItemWindow}
          image={image}
          setImage={setImage}
          setItem={setShowItemWindow}
          openLoadWindow={setIsShowImageWindow}
        />
      </ModalLayout>
      <ModalLayout
        isActive={showBoxWindow}
        close={() => {
          setShowBoxWindow();
          setImage();
        }}
      >
        <BoxWindow
          box={showBoxWindow}
          image={image}
          setImage={setImage}
          setBox={setBox}
          openLoadWindow={setIsShowImageWindow}
        />
      </ModalLayout>
      <ModalLayout
        isActive={isShowImageWindow}
        close={() => setIsShowImageWindow(false)}
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
      <ModalLayout
        isActive={isShowPaymentWindow}
        close={() => setIsShowPaymentWindow()}
        children={<PaymentWindow />}
      />
    </div>
  );
};

export default Box;
