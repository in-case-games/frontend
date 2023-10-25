import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TemplateUser as UserLogo } from "../../../assets/images/main";
import {
  Account as AccountImage,
  Box as BoxImage,
  Gun as GunImage,
  Link as LinkImage,
} from "../../../assets/images/icons";
import {
  Box as BoxApi,
  Game as GameApi,
  Item as ItemApi,
  User as UserApi,
} from "../../../api";
import { Small as Item } from "../../game-item";
import { Small as Box } from "../../loot-box";
import { Restriction } from "../../restriction";
import { LoadingArrow as Loading } from "../../loading";
import { Converter } from "../../../helpers/converter";
import styles from "./mini-profile.module";

const MiniProfileWindow = (props) => {
  const navigate = useNavigate();

  const gameApi = new GameApi();
  const userApi = new UserApi();
  const itemApi = new ItemApi();
  const boxApi = new BoxApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isAllRefresh, setIsAllRefresh] = useState(true);
  const [isStart, setIsStart] = useState(true);

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState(null);
  const [restrictions, setRestrictions] = useState(null);

  const [item, setItem] = useState(false);
  const [box, setBox] = useState(false);
  const [restriction, setRestriction] = useState(false);

  const setBarActive = (action) => {
    setItem(false);
    setBox(false);
    setRestriction(false);

    action();
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isAllRefresh) {
        setIsAllRefresh(false);

        const tu = await userApi.getById(props.userId);

        tu.image = await userApi.getImageByUserId(tu.id);
        tu.ownerRestrictions = tu.ownerRestrictions.slice(0, 3);
        tu.restrictions = tu.restrictions.slice(0, 3);

        if (tu) {
          const role = tu.additionalInfo.role.name;
          const rt = role === "user" ? tu.restrictions : tu.ownerRestrictions;

          setRestrictions(
            rt.map((r) => (
              <Restriction
                restriction={r}
                showMiniProfile={() => {
                  const id = role === "user" ? r.ownerId : r.userId;

                  props.exchangeWindow(id);

                  setHistory(null);
                  setRestrictions(null);
                  setIsLoading(true);
                  setIsAllRefresh(true);
                }}
                isOwnerImage={role === "user"}
                key={r.id}
              />
            ))
          );
        }
        if (tu && history && (item || box)) {
          let t = await userApi.getOpeningsByUserId(props.userId);
          t = t.slice(0, 15);

          for (let i = 0; i < t.length; i++) {
            if (box) {
              t[i].box = await boxApi.pushImage(
                await boxApi.getById(t[i].boxId)
              );
            } else if (item) {
              t[i].item = await itemApi.getById(t[i].itemId);
              const game = await gameApi.getByName(t[i].item.game);
              t[i].item.gameId = game.id;
              t[i].item = await itemApi.pushImage(t[i].item);
            }
          }

          setHistory(t);
        }

        setUser(tu);
        setIsLoading(false);
        setIsLoadingItems(false);
        setIsStart(false);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const firstLoadHistory = async (data) => {
    const isBox = data === "box";
    const isItem = data === "item";

    if (isItem) setBarActive(() => setItem(!item));
    else if (isBox) setBarActive(() => setBox(!box));

    if (
      (isItem && (!history || !history[0]?.item)) ||
      (isBox && (!history || !history[0]?.box))
    ) {
      let h = !history
        ? await userApi.getOpeningsByUserId(props.userId)
        : history;
      h = h.slice(0, 15);

      for (let i = 0; i < h.length; i++) {
        if (isBox) {
          h[i].box = await boxApi.pushImage(await boxApi.getById(h[i].boxId));
        } else if (isItem) {
          h[i].item = await itemApi.getById(h[i].itemId);
          const game = await gameApi.getByName(h[i].item.game);
          h[i].item.gameId = game.id;
          h[i].item = await itemApi.pushImage(h[i].item);
        }
      }

      setHistory(h);
    }

    setIsLoadingItems(false);
  };

  return (
    <div className={styles.mini_profile}>
      <div className={styles.mini_profile_content}>
        {isStart || user === null ? (
          <Loading isLoading={isLoading} />
        ) : (
          <div className={styles.profile_uploaded}>
            <div className={styles.profile_header}>
              <div className={styles.profile_info}>
                <img
                  className={styles.logo}
                  alt=""
                  src={user?.image ?? UserLogo}
                />
                <div className={styles.main_info}>
                  <div className={styles.name}>
                    {user.login}
                    <img
                      alt=""
                      className={styles.link_profile}
                      src={LinkImage}
                      onClick={() => {
                        navigate(`/profile/${user.id}`);
                        props.exchangeWindow();
                      }}
                    />
                  </div>
                  <div className={styles.role}>
                    Роль:
                    {user.additionalInfo.role.name}
                  </div>
                  <div className={styles.creation}>
                    Создан:
                    {Converter.getMiniDate(user.additionalInfo.creationDate)}
                  </div>
                  <div className={styles.deletion}>
                    Будет удален:
                    {Converter.getMiniDate(user.additionalInfo.deletionDate)}
                  </div>
                </div>
              </div>
              <div className={styles.profile_loading}>
                <Loading
                  isLoading={isLoading}
                  setLoading={() => {
                    setIsLoading(true);
                    setIsAllRefresh(true);
                  }}
                />
              </div>
            </div>
            <div className={styles.delimiter}></div>
            <div className={styles.tool_bar}>
              <img
                alt=""
                src={GunImage}
                className={styles.item}
                style={{ background: item ? "transparent" : "#313138" }}
                onClick={async () => {
                  setIsLoadingItems(true);
                  await firstLoadHistory("item");
                }}
              />
              <img
                alt=""
                src={BoxImage}
                className={styles.box}
                style={{ background: box ? "transparent" : "#313138" }}
                onClick={async () => {
                  setIsLoadingItems(true);
                  await firstLoadHistory("box");
                }}
              />
              <img
                alt=""
                src={AccountImage}
                className={styles.restriction}
                style={{
                  background: restriction ? "transparent" : "#313138",
                }}
                onClick={() => {
                  setBarActive(() =>
                    setRestriction(restrictions && !restriction)
                  );
                }}
              />
            </div>
            <div className={styles.items}>
              {restrictions && restriction ? restrictions : null}
              {isLoadingItems ? <Loading isLoading={isLoadingItems} /> : null}
              {history && history[0]?.box && box
                ? history.map((h) => (
                    <Box
                      box={h.box}
                      showWindow={() => props.openBoxWindow(h.box)}
                      key={h.id}
                    />
                  ))
                : null}
              {history && history[0]?.item && item
                ? history.map((h) => (
                    <Item
                      item={h.item}
                      showWindow={() => props.openItemWindow(h.item)}
                      key={h.id}
                    />
                  ))
                : null}
            </div>
            {box || restriction || item ? (
              <div className={styles.delimiter}></div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniProfileWindow;
