import React, { useEffect, useState } from "react";
import { delete_cookie } from "sfcookies";
import { TemplateUser as UserImage } from "../../../../assets/images/main";
import {
  ProfileBar as BarButton,
  ProfileHeaderBar as HeaderBarButton,
} from "../../../../components/common/buttons";
import { User as UserApi } from "../../../../api";
import TokenService from "../../../../services/token";
import styles from "../../profile.module";

const Bar = (props) => {
  const userApi = new UserApi();
  const [isStart, setIsStart] = useState(true);
  const [user, setUser] = useState(TokenService.getUser());

  const exit = () => {
    TokenService.removeUser();
    setUser(null);
    delete_cookie("user-balance");
  };

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);

        const temp = TokenService.getUser();
        temp.image = await userApi.getImage();

        setUser(temp);
      },
      isStart ? 100 : 10000
    );

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.panel_bar}>
      <HeaderBarButton
        image={user?.image || UserImage}
        name={user?.name || ""}
        click={() => props.exchange("profile")}
        isActive={props.content === "profile"}
      />
      <BarButton
        text="Инвентарь"
        click={() => props.exchange("inventory")}
        isActive={props.content === "inventory"}
      />
      <BarButton
        text="Открытые кейсы"
        click={() => props.exchange("box")}
        isActive={props.content === "box"}
      />
      <BarButton
        text="Пополнения"
        click={() => props.exchange("payment")}
        isActive={props.content === "payment"}
      />
      <BarButton
        text="Выводы"
        click={() => props.exchange("withdrawn")}
        isActive={props.content === "withdrawn"}
      />
      <BarButton
        text="Промокоды"
        click={() => props.exchange("promo_code")}
        isActive={props.content === "promo_code"}
      />
      {user && user.role === "owner" ? (
        <BarButton
          text="Админ панель"
          click={() => props.exchange("admin")}
          isActive={props.content.split("-")[0] === "admin"}
        />
      ) : null}
      <BarButton click={exit} text="Выйти" />
    </div>
  );
};

export default Bar;
