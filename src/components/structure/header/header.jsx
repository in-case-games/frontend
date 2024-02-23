import React, { useEffect, useState } from "react";
import {
  FlagRUS,
  Gamepad,
  DotLightGreen,
  Info,
} from "../../../assets/images/icons";
import {
  User as UserApi,
  Box as BoxApi,
  Item as ItemApi,
  Game as GameApi,
} from "../../../api";
import { ListLunge, Logo, UserBar } from "../../common/buttons";
import { Modal as ModalLayout } from "../../../layouts";
import {
  EmailSend as EmailSendWindow,
  ForgotPassword as ForgotPasswordWindow,
  Payment as PaymentWindow,
  SignIn as SignInWindow,
  SignUp as SignUpWindow,
} from "../../windows";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/inputs";
import { Handler } from "../../../helpers/handler";
import TokenService from "../../../services/token";
import Constants from "../../../constants";
import styles from "./header.module";

const Header = () => {
  const width = window.innerWidth;
  const userApi = new UserApi();
  const boxApi = new BoxApi();
  const itemApi = new ItemApi();
  const gameApi = new GameApi();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [isDate, setIsDate] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  const [signUpActive, setSignUpActive] = useState(false);
  const [signInActive, setSignInActive] = useState(false);
  const [emailSendActive, setEmailSendActive] = useState(false);
  const [paymentActive, setPaymentActive] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [burgerActive, setBurgerActive] = useState();

  const [penaltyDelay, setPenaltyDelay] = useState(0);
  const [search, setSearch] = useState();
  const [searchDetected, setSearchDetected] = useState({ items: [] });
  const [games, setGames] = useState();

  const [timeBeforeGoSearch, setTimeBeforeGoSearch] = useState();

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
        await Handler.error(async () => {
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
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      await Handler.error(
        async () => {
          if (!games) setGames(await gameApi.get());
        },
        undefined,
        undefined,
        penaltyDelay,
        setPenaltyDelay,
        "HEADER"
      );
      if (TokenService.getAccessToken() !== undefined && user === null)
        setIsAuth(null);
      else setIsAuth(TokenService.getAccessToken() !== undefined);

      if (timeBeforeGoSearch) {
        const nextTime = timeBeforeGoSearch - 100;

        if (nextTime <= 0) {
          let result = [];

          try {
            const res = await userApi.getByLogin(search);

            result.push({
              id: res.id,
              image: await userApi.getImageByUserId(res.id),
              name: search,
              click: () => {
                setSearch();
                setSearchDetected((prev) => ({ ...prev, items: [] }));
                navigate(`/profile/${res.id}`);
              },
            });
          } catch (ex) {}
          try {
            const res = await boxApi.getByName(search);
            const box = await boxApi.pushImage(res);

            result.push({
              id: box.id,
              image: box.image,
              name: search,
              click: () => {
                setSearch();
                setSearchDetected((prev) => ({ ...prev, items: [] }));
                navigate(`/box/${box.id}`);
              },
            });
          } catch (ex) {}
          try {
            let res = await itemApi.getByName(search);

            for (let i = 0; i < res.length; i++) {
              res[i].gameId = games.find((g) => g.name === res[i].game).id;
              const item = await itemApi.pushImage(res[i]);
              result.push({
                id: item.id,
                image: item.image,
                name: search,
                click: () => {
                  setSearchDetected((prev) => ({ ...prev, items: [] }));
                  setSearch();
                },
              });
            }
          } catch (ex) {}

          setSearchDetected((prev) => ({ ...prev, items: result }));
          setTimeBeforeGoSearch();
        } else setTimeBeforeGoSearch(nextTime);
      }
    }, 100 + penaltyDelay);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (TokenService.getAccessToken()) {
        await Handler.error(
          async () => {
            await userApi.get();
            setUser({
              image: TokenService.getUser()?.image,
              balance: user?.balance ?? 0,
            });
          },
          (ex) => {
            //TODO check not found user then TokenService.removeUser()
            console.log(ex);
            return true;
          },
          undefined,
          penaltyDelay,
          setPenaltyDelay
        );
      }

      setIsDate(TokenService.getExpiresAccessToken());
    }, secondsBeforeRefresh() + penaltyDelay);

    return () => clearInterval(interval);
  });

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__wrapper}>
          <div className={styles.header_language}>
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
          {width > 458 ? (
            <div className={styles.header_search_bar}>
              <div className={styles.search}>
                <Input
                  isApply={true}
                  color="#00ff82"
                  placeholder="Поиск"
                  value={search}
                  setValue={async (v) => {
                    setTimeBeforeGoSearch(500);
                    setSearch(v);
                  }}
                />
                <div className={styles.search_items}>
                  {searchDetected.items?.length > 0
                    ? searchDetected.items.map((i) => (
                        <div
                          className={styles.search_item}
                          key={i.id + "search"}
                          onClick={i.click}
                        >
                          <img alt="" src={i.image} className={styles.image} />
                          <div className={styles.name}>{i.name}</div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : null}
          <div className={styles.header_user_bar}>
            <div className={styles.user_bar}>
              <UserBar
                user={user}
                isAuth={isAuth === true}
                isSignIn={isAuth === false}
                showWindow={exchangeWindow}
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
