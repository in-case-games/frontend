import React, { useEffect, useState } from "react";
import { TemplateItem as ItemImage } from "../../../assets/images/main";
import { Game as GameApi, Item as ItemApi } from "../../../api";
import TokenService from "../../../services/token";
import Constants from "../../../constants";
import {
  LoadingHourglass as Hourglass,
  LoadingArrow as Loading,
} from "../../loading";
import { Input, ComboBox } from "../../common/inputs";
import styles from "./item.module";

const Item = (props) => {
  const itemApi = new ItemApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isBlockRefresh, setIsBlockRefresh] = useState(false);

  const [backOperation, setBackOperation] = useState(null);
  const [operation, setOperation] = useState(null);

  const [user, setUser] = useState(TokenService.getUser());
  const [item, setItem] = useState(
    props.item?.id ? props.item : Constants.TemplateItem
  );
  const [gradient, setGradient] = useState(
    Constants.ItemGradients[props.item?.rarity ? props.item.rarity : "white"]
  );
  const [errorMessage, setErrorMessage] = useState();

  const [rarities, setRarities] = useState([]);
  const [types, setTypes] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [games, setGames] = useState([]);

  const handleSetItem = (item) => {
    setIsBlockRefresh(true);
    setItem(item);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation !== null) {
        let t = backOperation - 1;
        t = t >= 0 ? t : 0;

        setBackOperation(t);

        if (t === 0) {
          try {
            await operations[operation]();
          } catch (ex) {
            setIsLoading(true);

            if (
              ex?.response?.status < 500 &&
              ex?.response?.data?.error?.message
            ) {
              console.log(ex);
              setErrorMessage(ex.response.data.error.message);
            } else {
              console.log(ex);
              setErrorMessage("Неизвестная ошибка");
            }
          }

          setOperation(null);
          setBackOperation(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => setIsLoading(!isBlockRefresh), 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isLoading) {
        try {
          setUser(TokenService.getUser());
          setItem(
            props.item?.id
              ? await itemApi.getById(props.item?.id)
              : Constants.TemplateItem
          );

          setTypes(await itemApi.getTypes());
          setRarities(await itemApi.getRarities());
          setQualities(await itemApi.getQualities());
          setGames(await gameApi.get());
          setGradient(Constants.ItemGradients[item.rarity]);

          setIsLoading(false);
        } catch (ex) {
          console.log(ex);

          if (
            ex?.response?.status < 500 &&
            ex?.response?.data?.error?.message
          ) {
            setErrorMessage(ex.response.data.error.message);
          } else {
            setErrorMessage("Неизвестная ошибка");
          }
        }
      }

      setGradient(
        Constants.ItemGradients[
          props.item?.rarity ? props.item.rarity : "white"
        ]
      );
    }, 100);

    return () => clearInterval(interval);
  });

  const buttonClick = (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation(null);
      setOperation(null);
    } else if (backOperation === null) {
      setBackOperation(5);

      if (isDelete) setOperation("delete-item");
      else if (item?.id) setOperation("update-item");
      else setOperation("create-item");
    }
  };

  const deleteItem = async () => {
    await itemApi.delete(item.id);

    props.setImage(null);
    props.setItem();

    setItem(Constants.TemplateItem);
    setIsBlockRefresh(false);
    setIsLoading(true);
  };

  const updateItem = async () => {
    item.image = props.image;
    item.gameId = games.find((g) => g.name === item.game).id;
    item.rarityId = rarities.find((r) => r.name === item.rarity).id;
    item.qualityId = qualities.find((q) => q.name === item.quality).id;
    item.typeId = types.find((t) => t.name === item.type).id;

    const response = await itemApi.put(item);

    response.image = props.image || props.item?.image;

    props.setImage(null);
    props.setItem(response);

    setItem(response);
    setIsBlockRefresh(false);
    setIsLoading(true);
  };

  const createItem = async () => {
    item.image = props.image;
    item.gameId = games.find((g) => g.name === item.game).id;
    item.rarityId = rarities.find((r) => r.name === item.rarity).id;
    item.qualityId = qualities.find((q) => q.name === item.quality).id;
    item.typeId = types.find((t) => t.name === item.type).id;

    const response = await itemApi.post(item);

    response.image = props.image || props.item?.image;

    props.setImage(null);
    props.setItem(response);
    setItem(response);
    setIsBlockRefresh(false);
    setIsLoading(true);
  };

  const operations = {
    "create-item": createItem,
    "delete-item": deleteItem,
    "update-item": updateItem,
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_content}>
        <div className={styles.item_header}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => {
                setIsBlockRefresh(false);
                setIsLoading(true);
                props.setImage(null);
              }}
            />
          </div>
          <div className={styles.tittle}>Информация по предмету</div>
        </div>
        <div className={styles.error}>{errorMessage}</div>
        <div className={styles.item_info}>
          <div
            className={styles.item_display}
            onClick={() => props.openLoadWindow(user?.role === "owner")}
            style={{ cursor: user?.role === "owner" ? "pointer" : "default" }}
          >
            {
              <img
                className={styles.image}
                alt=""
                src={props?.image || props?.item?.image || ItemImage}
                style={{ background: gradient }}
              />
            }
            <Hourglass updateDate={item?.updateDate} rate={300} />
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.tittle}>Подробная информация</div>
          <div className={styles.inputs}>
            <Input
              subTittle="Название:"
              name="item-name"
              placeholder="Название"
              isReadOnly={user?.role !== "owner"}
              value={item?.name}
              setValue={(value) => handleSetItem({ ...item, name: value })}
            />
            <Input
              subTittle="Стоимость:"
              name="item-cost"
              placeholder="Стоимость"
              value={item?.cost}
              setValue={(value) => handleSetItem({ ...item, cost: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <ComboBox
              subTittle="Игра:"
              name="item-game"
              placeholder="Игра"
              value={item?.game}
              values={games}
              setValue={(value) => handleSetItem({ ...item, game: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <Input
              subTittle="Хэш имя:"
              name="item-hash-name"
              value={item?.hashName}
              setValue={(value) => handleSetItem({ ...item, hashName: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <Input
              subTittle="Идентификатор:"
              name="item-id-for-market"
              placeholder="Идентификатор"
              value={item?.idForMarket}
              setValue={(value) =>
                handleSetItem({ ...item, idForMarket: value })
              }
              isReadOnly={user?.role !== "owner"}
            />
            <ComboBox
              subTittle="Качество:"
              name="item-quality"
              placeholder="Качество"
              value={item?.quality ?? "none"}
              values={qualities}
              setValue={(value) => handleSetItem({ ...item, quality: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <ComboBox
              subTittle="Редкость:"
              name="item-rarity"
              placeholder="Редкость"
              value={item?.rarity ?? "white"}
              values={rarities}
              setValue={(value) => handleSetItem({ ...item, rarity: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <ComboBox
              subTittle="Тип:"
              name="item-type"
              placeholder="Тип"
              value={item?.type ?? "none"}
              values={types}
              setValue={(value) => handleSetItem({ ...item, type: value })}
              isReadOnly={user?.role !== "owner"}
            />
          </div>
          {user?.role === "owner" ? (
            <div className={styles.item_buttons}>
              {backOperation === null ? (
                <div
                  className={styles.button_send}
                  onClick={() => buttonClick()}
                >
                  {item?.id ? "Изменить" : "Создать"}
                </div>
              ) : null}
              {item?.id && backOperation === null ? (
                <div
                  className={styles.button_delete}
                  onClick={() => buttonClick(true)}
                >
                  Удалить
                </div>
              ) : null}
              {backOperation !== null ? (
                <div
                  className={styles.button_back}
                  onClick={() => buttonClick()}
                >
                  <div className={styles.text}>Вернуть</div>
                  <div className={styles.timer}>{backOperation}</div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Item;
