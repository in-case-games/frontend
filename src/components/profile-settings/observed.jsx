import React, { useEffect, useState } from "react";
import { TemplateUser as UserImage } from "../../assets/images/main";
import {
  AirplaneBlack,
  ArrowBottomGray as Arrow,
  DownloadWhite as Download,
} from "../../assets/images/icons";
import {
  User as UserApi,
  Box as BoxApi,
  Item as ItemApi,
  Game as GameApi,
} from "../../api";
import TokenService from "../../services/token";
import { Modal as ModalLayout } from "../../layouts";
import {
  Item as ItemWindow,
  LoadImage as LoadImageWindow,
  MiniProfile as MiniProfileWindow,
  Box as BoxWindow,
  HistoryOpening as HistoryOpeningWindow,
  Inventory as InventoryWindow,
  Restriction as RestrictionWindow,
} from "../windows";
import { Restriction } from "../restriction";
import { LoadingArrow as Loading } from "../loading";
import { Input, ComboBox } from "../common/inputs";
import styles from "./profile-settings.module";
import { Simple as SimpleBox } from "../loot-box";
import { Simple as SimpleItem } from "../game-item";

const Observed = (props) => {
  const userApi = new UserApi();
  const boxApi = new BoxApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const observedRole = props.user.additionalInfo.role.name;
  const observer = TokenService.getUser();

  const [item, setItem] = useState(null);
  const [box, setBox] = useState(null);
  const [image, setImage] = useState(null);
  const [historyOpening, setHistoryOpening] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [restriction, setRestriction] = useState(null);

  const [login, setLogin] = useState(props.user.login);
  const [email, setEmail] = useState(props.user.additionalInfo.email);
  const [balance, setBalance] = useState(null);
  const [role, setRole] = useState(props.user.additionalInfo.role.name);
  const [roles, setRoles] = useState([]);
  const [games, setGames] = useState([]);

  const [inventories, setInventories] = useState(null);
  const [restrictions, setRestrictions] = useState(null);
  const [historyOpenings, setHistoryOpenings] = useState({
    id: "",
    items: null,
  });
  const [miniProfile, setMiniProfile] = useState(null);

  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);
  const [showRestriction, setShowRestriction] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showInventories, setShowInventories] = useState(false);

  const [isApplyEmail, setIsApplyEmail] = useState(false);
  const [isApplyLogin, setIsApplyLogin] = useState(false);
  const [isApplyRole, setIsApplyRole] = useState(false);
  const [isApplyBalance, setIsApplyBalance] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isErrorRole, setIsErrorRole] = useState(false);
  const [isErrorBalance, setIsErrorBalance] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      props.setIsAllReload(false);

      if (props.isAllReload) resetToGlobalZero();
      if (!balance && (observer?.role || "user") !== "user")
        await loadBalance();
      if (!games || games.length === 0) setGames(await gameApi.get());
      if (!roles || roles.length === 0) setRoles(await userApi.getRoles());
      if (
        (showRestriction && !restrictions) ||
        (props.isLoading && showRestriction)
      )
        await loadRestrictions();
      if (
        (showInventories && !inventories) ||
        (props.isLoading && showInventories)
      )
        await loadItems();

      if (props.isLoading && (showItems || showBoxes))
        await loadHistoryOpenings();

      props.setIsLoading(false);
    }, 500);

    return () => clearInterval(interval);
  });

  const loadBalance = async () =>
    setBalance((await userApi.getBalanceByUserId(props.user.id)) || 0);

  const loadHistoryOpenings = async () => {
    let res = historyOpenings.items ?? [];

    if (res.length === 0) {
      res = await userApi.getOpeningsByUserId(props.user.id);
      res = res.slice(0, 12);
    }

    for (let i = 0; i < res.length; i++) {
      let r = res[i];

      if (!r.box && showBoxes) {
        r.box = await boxApi.getById(r.boxId);
        r.box = await boxApi.pushImage(r.box);
      }
      if (!r.item && showItems) {
        r.item = await itemApi.getById(r.itemId);
        r.item.gameId = games.find((g) => g.name === r.item.game).id;
        r.item = await itemApi.pushImage(r.item);
      }

      res[i] = r;
    }

    setHistoryOpenings({ ...historyOpenings, items: res });
  };

  const loadItems = async () => {
    let res = await userApi.getInventoryByUserId(props.user.id);
    res = res.slice(0, 20);

    for (let i = 0; i < res.length; i++) {
      let r = res[i];

      r.item = await itemApi.getById(r.itemId);
      r.item.gameId = games.find((g) => g.name === r.item.game).id;
      r.item = await itemApi.pushImage(r.item);

      res[i] = r;
    }

    setInventories(res);
  };

  const loadRestrictions = async () => {
    const res = [];
    const isUser = observedRole === "user";
    const restrictions = isUser
      ? await userApi.getRestrictionsByUserId(props.user.id)
      : await userApi.getRestrictionsByOwnerId(props.user.id);
    const length = restrictions.length > 19 ? 19 : restrictions.length;

    if ((observer?.role || "user") !== "user")
      res.push(<Restriction showRestriction={setRestriction} key="90" />);

    for (let i = 0; i < length; i++) {
      let r = restrictions[i];

      if (r.userId !== observer.id) {
        let userT = restrictions.find((t) => t.userId === r.userId)?.user;

        r.user = userT || (await userApi.getById(r.userId));
        r.user.image =
          r.user.image || (await userApi.getImageByUserId(r.userId));
      } else {
        r.user = observer;
      }

      if (r.ownerId !== observer.id) {
        let ownerT = restrictions.find((t) => t.ownerId === r.ownerId)?.owner;

        r.owner = ownerT || (await userApi.getById(r.ownerId));
        r.owner.image =
          r.owner.image || (await userApi.getImageByUserId(r.ownerId));
      } else {
        r.owner = observer;
      }

      res.push(
        <Restriction
          restriction={r}
          isUser={isUser}
          showRestriction={setRestriction}
          showMiniProfile={setMiniProfile}
          key={r.id}
        />
      );
    }

    setRestrictions(res);
  };

  const resetToGlobalZero = () => {
    setHistoryOpenings({ id: "", items: null });
    setInventories(null);
    setRestrictions(null);
    setLogin(props.user.login);
    setEmail(props.user.additionalInfo.email);
    setRole(props.user.additionalInfo.role.name);
    setBalance(null);
  };

  const changeEmail = async () => {
    try {
      await userApi.updateEmailByAdmin(props.user.id, email);

      setIsErrorEmail(false);
      setIsApplyEmail(true);
    } catch (err) {
      setIsApplyEmail(false);
      setIsErrorEmail(true);

      console.log(err);
    }
  };

  const changeLogin = async () => {
    try {
      await userApi.updateLoginByAdmin(props.user.id, login);

      setIsErrorLogin(false);
      setIsApplyLogin(true);
    } catch (err) {
      setIsApplyLogin(false);
      setIsErrorLogin(true);

      console.log(err);
    }
  };

  const changeRole = async () => {
    try {
      const id = roles.find((r) => r.name === role).id;
      await userApi.updateRoleByAdmin(props.user.id, id);

      setIsErrorRole(false);
      setIsApplyRole(true);
    } catch (err) {
      setIsApplyRole(false);
      setIsErrorRole(true);

      console.log(err);
    }
  };

  const changeBalance = async () => {
    try {
      await userApi.updateBalanceByAdmin(props.user.id, balance);

      setIsErrorBalance(false);
      setIsApplyBalance(true);
    } catch (err) {
      setIsApplyBalance(false);
      setIsErrorBalance(true);

      console.log(err);
    }
  };

  return (
    <div className={styles.profile_settings}>
      <div className={styles.settings}>
        <div className={styles.setting_main}>
          <div
            className={styles.profile_image}
            onMouseDown={() =>
              props.showLoadImage(
                observer?.role === "owner" || observer?.role === "admin"
              )
            }
          >
            <img
              className={styles.image}
              alt=""
              src={props.user?.image ?? UserImage}
            />
            <img
              className={styles.load_icon}
              alt=""
              src={Download}
              style={{
                visibility:
                  observer?.role === "owner" || observer?.role === "admin"
                    ? "visible"
                    : "hidden",
              }}
            />
          </div>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <Input
                name="account-login"
                isReadOnly={observer?.role !== "owner"}
                value={login}
                setValue={setLogin}
                isApply={isApplyLogin}
                isError={isErrorLogin}
              />
              {observer?.role === "owner" ? (
                <img
                  alt=""
                  src={AirplaneBlack}
                  className={styles.image}
                  onClick={changeLogin}
                />
              ) : null}
            </div>
            {observer?.role === "owner" ? (
              <div className={styles.input}>
                <Input
                  name="account-balance"
                  isReadOnly={observer?.role !== "owner"}
                  value={balance ?? 0}
                  setValue={setBalance}
                  isApply={isApplyBalance}
                  isError={isErrorBalance}
                />
                <img
                  alt=""
                  src={AirplaneBlack}
                  className={styles.button_top_up}
                  onClick={changeBalance}
                />
              </div>
            ) : null}
            {observer?.role === "owner" ? (
              <div className={styles.input}>
                <Input
                  name="account-email"
                  isReadOnly={observer?.role !== "owner"}
                  value={email}
                  placeholder="Email"
                  setValue={setEmail}
                  isApply={isApplyEmail}
                  isError={isErrorEmail}
                />
                <img
                  alt=""
                  src={AirplaneBlack}
                  className={styles.image}
                  onClick={changeEmail}
                />
              </div>
            ) : null}
            <div className={styles.input}>
              <ComboBox
                name="account-role"
                isReadOnly={observer?.role !== "owner"}
                value={role}
                values={roles}
                setValue={setRole}
                isApply={isApplyRole}
                isError={isErrorRole}
              />
              {observer?.role === "owner" ? (
                <img
                  alt=""
                  src={AirplaneBlack}
                  className={styles.image}
                  onClick={changeRole}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tittle_notify}>
        {showBoxes
          ? "Последние открытые кейсы"
          : "Нажмите на стрелку, чтобы показать последние открытые кейсы"}
      </div>
      <div
        className={styles.settings}
        style={{
          justifyContent: "center",
          cursor: showBoxes ? "default" : "pointer",
        }}
        onClick={() => {
          setShowBoxes(true);
          props.setIsLoading(true);
        }}
      >
        {showBoxes ? (
          <div
            className={styles.boxes}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showBoxes && historyOpenings.items !== null ? (
              historyOpenings.items.map((h) => (
                <SimpleBox
                  box={h.box}
                  showBox={() => {
                    let temp = h;
                    temp.user = props.user;

                    setHistoryOpening(temp);
                  }}
                  key={h.id}
                />
              ))
            ) : (
              <div className={styles.loading}>
                <Loading isLoading={true} />
              </div>
            )}
          </div>
        ) : (
          <img alt="" className={styles.open} src={Arrow} />
        )}
      </div>
      <div className={styles.tittle_notify}>
        {showItems
          ? "Последние выпавшие предметы"
          : "Нажмите на стрелку, чтобы показать последние выпавшие предметы"}
      </div>
      <div
        className={styles.settings}
        style={{
          justifyContent: "center",
          cursor: showItems ? "default" : "pointer",
        }}
        onClick={() => {
          setShowItems(true);
          props.setIsLoading(true);
        }}
      >
        {showItems ? (
          <div
            className={styles.items}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showItems && historyOpenings.items !== null ? (
              historyOpenings.items.map((h) => (
                <SimpleItem
                  item={h.item}
                  showItem={() => {
                    let temp = h;
                    temp.user = props.user;

                    setHistoryOpening(temp);
                  }}
                  key={h.id}
                />
              ))
            ) : (
              <div className={styles.loading}>
                <Loading isLoading={true} />
              </div>
            )}
          </div>
        ) : (
          <img alt="" className={styles.open} src={Arrow} />
        )}
      </div>
      <div className={styles.tittle_notify}>
        {showInventories
          ? "Последние 20 предметов инвентаря"
          : "Нажмите на стрелку, чтобы показать последние 20 предметов инвентарь"}
      </div>
      <div
        className={styles.settings}
        style={{
          justifyContent: "center",
          cursor: showInventories ? "default" : "pointer",
        }}
        onClick={() => setShowInventories(true)}
      >
        {showInventories ? (
          <div
            className={styles.inventories}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {inventories ? (
              inventories.map((i) => (
                <SimpleItem
                  item={i.item}
                  showItem={() => {
                    let temp = i;
                    temp.user = props.user;

                    setInventory(temp);
                  }}
                  key={i.id}
                />
              ))
            ) : (
              <div className={styles.loading}>
                <Loading isLoading={!inventories} />
              </div>
            )}
          </div>
        ) : (
          <img alt="" className={styles.open} src={Arrow} />
        )}
      </div>
      <div className={styles.tittle_notify}>
        {showRestriction
          ? "История ограничений"
          : "Нажмите на стрелку, чтобы показать историю ограничений"}
      </div>
      <div
        className={styles.settings}
        style={{
          justifyContent: "center",
          cursor: showRestriction ? "default" : "pointer",
        }}
        onClick={() => setShowRestriction(true)}
      >
        {showRestriction ? (
          <div
            className={styles.restrictions}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {restrictions || (
              <div className={styles.loading}>
                <Loading isLoading={!restrictions} />
              </div>
            )}
          </div>
        ) : (
          <img alt="" className={styles.open} src={Arrow} />
        )}
      </div>
      <ModalLayout isActive={miniProfile} close={() => setMiniProfile(null)}>
        <MiniProfileWindow
          userId={miniProfile}
          openRestrictionWindow={(r) => setRestriction(r)}
          openItemWindow={(item) => setItem(item)}
          openBoxWindow={(box) => setBox(box)}
          exchangeWindow={(id) => setMiniProfile(id)}
        />
      </ModalLayout>
      <ModalLayout
        isActive={historyOpening}
        close={() => setHistoryOpening(null)}
      >
        <HistoryOpeningWindow
          history={historyOpening}
          setItem={setItem}
          setBox={setBox}
          close={() => setHistoryOpening(null)}
        />
      </ModalLayout>
      <ModalLayout isActive={inventory} close={() => setInventory(null)}>
        <InventoryWindow
          inventory={inventory}
          setItem={setItem}
          close={() => {
            setInventory(null);
            props.setIsAllReload(true);
          }}
        />
      </ModalLayout>
      <ModalLayout isActive={restriction} close={() => setRestriction()}>
        <RestrictionWindow
          restriction={restriction}
          setRestriction={setRestriction}
          close={() => {
            setRestriction();
            props.setIsAllReload(true);
          }}
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

export default Observed;
