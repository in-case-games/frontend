import React, { useEffect, useState } from "react";
import { TemplateUser as UserImage } from "../../assets/images/main";
import {
  ArrowBottomGray as Arrow,
  NotebookBlack as Notebook,
  CrossBlack as Cross,
  DownloadWhite as Download,
  MailboxBlack as Mailbox,
  PenBlack as Pen,
} from "../../assets/images/icons";
import { User as UserApi } from "../../api";
import TokenService from "../../services/token";
import { Game } from "../game";
import { Modal as ModalLayout } from "../../layouts";
import {
  Item as ItemWindow,
  LoadImage as LoadImageWindow,
  MiniProfile as MiniProfileWindow,
  TradeUrl as TradeUrlWindow,
  Box as BoxWindow,
} from "../windows";
import { Restriction } from "../restriction";
import { PullOutProfile as PullOut } from "../common/buttons";
import { LoadingArrow as Loading } from "../loading";
import { Input } from "../common/inputs";
import Constants from "../../constants";
import styles from "./profile-settings.module";

const Observer = (props) => {
  const userApi = new UserApi();

  const [user, setUser] = useState(TokenService.getUser());
  const [game, setGame] = useState(null);
  const [restrictions, setRestrictions] = useState(null);
  const [miniProfile, setMiniProfile] = useState(null);
  const [item, setItem] = useState(null);
  const [box, setBox] = useState(null);
  const [image, setImage] = useState(null);

  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showRestriction, setShowRestriction] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => props.setIsLoading(!props.isLoading),
      10000
    );

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        (showRestriction && !restrictions) ||
        (props.isLoading && showRestriction)
      ) {
        let temp = [];
        const userTemp = TokenService.getUser();

        if (userTemp.role && userTemp.role !== "user") {
          Array.prototype.push.apply(
            temp,
            await userApi.getRestrictionsByOwner()
          );
        } else {
          Array.prototype.push.apply(temp, await userApi.getRestrictions());
        }

        setRestrictions(temp.slice(0, 20));
      }
      if (props.isLoading) {
        const temp = TokenService.getUser();
        temp.image = await userApi.getImage();

        setUser(temp);
        props.setIsLoading(false);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.profile_settings}>
      <div className={styles.settings}>
        <div className={styles.setting_main}>
          <div
            className={styles.profile_image}
            onMouseDown={() => props.exchangeWindow("load_image")}
          >
            <img
              className={styles.image}
              alt=""
              src={user?.image ?? UserImage}
            />
            <img className={styles.load_icon} alt="" src={Download} />
          </div>
          <div className={styles.inputs}>
            <Input name="account-login" isReadOnly={true} value={user.name} />
            <Input name="account-email" isReadOnly={true} value={user.email} />
            <Input name="account-role" isReadOnly={true} value={user.role} />
          </div>
        </div>
        <div className={styles.actions}>
          <PullOut
            image={Notebook}
            text="Изменить логин"
            click={() => props.setController("login")}
          />
          <PullOut
            image={Mailbox}
            text="Изменить почту"
            click={() => props.setController("email")}
          />
          <PullOut
            image={Pen}
            text="Изменить пароль"
            click={() => props.setController("password")}
          />
          <PullOut
            image={Cross}
            text="Удалить аккаунт"
            click={() => props.setController("account_delete")}
            type="delete"
          />
        </div>
      </div>
      <div className={styles.tittle_notify}>
        {showGames
          ? "Нажмите на игру, чтобы изменить ссылку на обмен"
          : "Нажмите на стрелку, чтобы показать игры"}
      </div>
      <div
        className={styles.settings}
        style={{
          justifyContent: "center",
          cursor: showGames ? "default" : "pointer",
        }}
        onClick={() => setShowGames(true)}
      >
        {showGames ? (
          <div
            className={styles.games}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Constants.Games?.map((g) => (
              <Game
                image={g.image}
                key={g.id}
                click={() => {
                  if (g.name && g.regexTrade && g.nameTrade) {
                    setGame(g);
                  }
                }}
              />
            ))}
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
              alignItems: "center",
            }}
          >
            {restrictions ? (
              restrictions.map((r) => (
                <Restriction
                  restriction={r}
                  showMiniProfile={() =>
                    setMiniProfile(user.role === "user" ? r.ownerId : r.userId)
                  }
                  isOwnerImage={user.role === "user"}
                  key={r.id}
                />
              ))
            ) : (
              <div className={styles.loading}>
                <Loading isLoading={!restrictions} setIsLoading={() => {}} />
              </div>
            )}
          </div>
        ) : (
          <img alt="" className={styles.open} src={Arrow} />
        )}
      </div>
      <ModalLayout isActive={game} close={() => setGame(null)}>
        <TradeUrlWindow game={game} />
      </ModalLayout>
      <ModalLayout isActive={miniProfile} close={() => setMiniProfile(null)}>
        <MiniProfileWindow
          userId={miniProfile}
          openItemWindow={(item) => setItem(item)}
          openBoxWindow={(box) => setBox(box)}
          exchangeWindow={(id) => setMiniProfile(id)}
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

export default Observer;
