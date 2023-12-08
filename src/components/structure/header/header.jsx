import React, { useEffect, useState } from "react";
import {
  Flag,
  FlagRUS,
  Gamepad,
  DotLightGreen,
  Info,
  LootBox,
} from "../../../assets/images/icons";
import {
  User as UserApi,
  Box as BoxApi,
  Item as ItemApi,
  Game as GameApi,
} from "../../../api";
import TokenService from "../../../services/token";
import { ListLunge, Logo, UserBar } from "../../common/buttons";
import Constants from "../../../constants";
import styles from "./header.module";
import { Modal as ModalLayout } from "../../../layouts";
import {
  EmailSend as EmailSendWindow,
  ForgotPassword as ForgotPasswordWindow,
  Payment as PaymentWindow,
  SignIn as SignInWindow,
  SignUp as SignUpWindow,
} from "../../windows";
import { Input } from "../../common/inputs";

const Header = () => {
  const userApi = new UserApi();
  const boxApi = new BoxApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const [user, setUser] = useState(null);

  const [isDate, setIsDate] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  const [signUpActive, setSignUpActive] = useState(false);
  const [signInActive, setSignInActive] = useState(false);
  const [emailSendActive, setEmailSendActive] = useState(false);
  const [paymentActive, setPaymentActive] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [burgerActive, setBurgerActive] = useState();

  const [search, setSearch] = useState();
  const [searchDetected, setSearchDetected] = useState({ items: [] });
  const [games, setGames] = useState();

  const setWindow = {
    sign_in: () => setSignInActive(true),
    sign_up: () => setSignUpActive(true),
    email: () => setEmailSendActive(true),
    payment: () => setPaymentActive(true),
    forgot: () => setForgotPasswordActive(true),
    close: () => setSignInActive(false),
  };

  const exchangeWindow = (window) => {
    setBurgerActive();
    setSignUpActive(false);
    setSignInActive(false);
    setEmailSendActive(false);
    setPaymentActive(false);
    setForgotPasswordActive(false);

    setWindow[window]();
  };

  const secondsBeforeRefresh = () => {
    if (isDate === null) return 100;

    const expiryToken = new Date(isDate).getTime() + 300000;
    const dateNow = new Date().getTime();

    return expiryToken <= dateNow ? 1000 : expiryToken - dateNow;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (TokenService.getAccessToken() !== undefined) {
        let response = await userApi.getBalance();

        response =
          response >= 10000000
            ? `${Math.ceil(response / 1000000)}M`
            : Math.ceil(response);

        let temp = {
          image: user?.image,
          balance: response,
        };

        setUser(temp);
      }
    }, 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!games) setGames(await gameApi.get());
      if (TokenService.getAccessToken() !== undefined && user === null)
        setIsAuth(null);
      else setIsAuth(TokenService.getAccessToken() !== undefined);
    }, 100);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (TokenService.getAccessToken()) {
        try {
          await userApi.get();
          setUser({
            image: await userApi.getImage(),
            balance: user?.balance ?? 0,
          });
        } catch (err) {}
      }

      setIsDate(TokenService.getExpiresAccessToken());
    }, secondsBeforeRefresh());

    return () => clearInterval(interval);
  });

  const goSearch = (e) => {
    if (e.keyCode === 13) {
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__wrapper}>
          <div className={styles.header_online}>
            <img alt="" src={DotLightGreen}></img>
            <div className={styles.online}>1000</div>
          </div>
          <div className={styles.header_navbar}>
            <Logo />
            <nav className={styles.navbar}>
              <ListLunge
                isActive={burgerActive === "games"}
                setIsActive={() =>
                  setBurgerActive(burgerActive === "games" ? "" : "games")
                }
                tittle="Игры"
                icon={Gamepad}
                items={Constants.Games}
              />
              <ListLunge
                isActive={burgerActive === "infos"}
                setIsActive={() =>
                  setBurgerActive(burgerActive === "infos" ? "" : "infos")
                }
                tittle="Инфо"
                icon={Info}
                items={Constants.Infos}
              />
            </nav>
          </div>
          <div className={styles.header_search_bar}>
            <Input
              isApply={true}
              color="#00ff82"
              placeholder="Поиск"
              onKeyDown={goSearch}
              value={search}
              setValue={async (v) => {
                let result = [];

                try {
                  const res = await userApi.getByLogin(v);

                  result.push({
                    id: res.id,
                    image: await userApi.getImageByUserId(res.id),
                    name: v,
                  });
                } catch (ex) {}
                try {
                  const res = await boxApi.getByName(v);
                  const box = await boxApi.pushImage(res);

                  result.push({
                    id: box.id,
                    image: box.image,
                    name: v,
                  });
                } catch (ex) {}
                try {
                  let res = await itemApi.getByName(v);

                  for (let i = 0; i < res.length; i++) {
                    res[i].gameId = games.find(
                      (g) => g.name === res[i].game
                    ).id;
                    const item = await itemApi.pushImage(res[i]);
                    result.push({
                      id: item.id,
                      image: item.image,
                      name: v,
                    });
                  }
                } catch (ex) {}

                setSearchDetected((prev) => ({ ...prev, items: result }));
                setSearch(v);
              }}
            />
            {searchDetected.items?.length > 0
              ? searchDetected.items.map((i) => (
                  <div className={styles.search_item} key={i.id + "search"}>
                    <img alt="" src={i.image} className={styles.image} />
                  </div>
                ))
              : null}
          </div>
          <div className={styles.header_user_bar}>
            <div className={styles.user_bar}>
              <UserBar
                user={user}
                isAuth={isAuth === true}
                isSignIn={isAuth === false}
                showWindow={exchangeWindow}
              />
            </div>
            <div className={styles.list_lunge}>
              <ListLunge
                isActive={false}
                setIsActive={() => {}}
                tittle="RU"
                icon={FlagRUS}
                items={null}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalLayout
        isActive={signUpActive}
        close={() => setSignUpActive(false)}
        children={<SignUpWindow exchangeWindow={exchangeWindow} />}
      />
      <ModalLayout
        isActive={signInActive}
        close={() => setSignInActive(false)}
        children={<SignInWindow exchangeWindow={exchangeWindow} />}
      />
      <ModalLayout
        isActive={forgotPasswordActive}
        close={() => setForgotPasswordActive(false)}
        children={<ForgotPasswordWindow exchangeWindow={exchangeWindow} />}
      />
      <ModalLayout
        isActive={emailSendActive}
        close={() => setEmailSendActive(false)}
        children={<EmailSendWindow />}
      />
      <ModalLayout
        isActive={paymentActive}
        close={() => setPaymentActive(false)}
        children={<PaymentWindow />}
      />
    </header>
  );
};

export default Header;
