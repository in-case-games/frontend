import React, { useEffect, useState } from "react";
import {
  TemplateItem as ItemImage,
  TemplateBox as BoxImage,
} from "../../../assets/images/main";
import { Item as ItemApi, Box as BoxApi, Game as GameApi } from "../../../api";
import { LoadingArrow as Loading } from "../../loading";
import { Input } from "../../common/inputs";
import TokenService from "../../../services/token";
import styles from "./box-inventory.module";

const BoxInventory = (props) => {
  const itemApi = new ItemApi();
  const boxApi = new BoxApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);

  const [backOperation, setBackOperation] = useState(null);
  const [operation, setOperation] = useState(null);

  const [errorMessage, setErrorMessage] = useState();
  const [user, setUser] = useState(TokenService.getUser());
  const [item, setItem] = useState(props.inventory?.item || {});
  const [box, setBox] = useState(props.inventory?.box || {});
  const [games, setGames] = useState();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!games) setGames(await gameApi.get());
        if (isLoading && !box?.image) {
          setUser(TokenService.getUser());
          setBox(
            await boxApi.pushImage(await boxApi.getById(props.inventory.boxId))
          );
        }

        setIsLoading(false);
      } catch (ex) {
        console.log(ex);
        if (ex?.response?.status < 500 && ex?.response?.data?.error?.message) {
          setErrorMessage(ex.response.data.error.message);
        } else {
          setErrorMessage("Неизвестная ошибка");
        }
      }
    }, 500);

    return () => clearInterval(interval);
  });

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
          setOperation(null);
          setBackOperation(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const buttonClick = async (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation(null);
      setOperation(null);
    } else if (backOperation === null) {
      try {
        const i = (await itemApi.getByName(item.name))[0];
        i.gameId = games.find((g) => g.name === i.game).id;
        setItem(await itemApi.pushImage(i));

        if (isDelete) setOperation("delete-inventory");
        else if (props.inventory?.chanceWining)
          setOperation("update-inventory");
        else setOperation("create-inventory");

        setBackOperation(5);
      } catch (ex) {
        console.log(ex);

        if (ex?.response?.status < 500 && ex?.response?.data?.error?.message) {
          setErrorMessage(ex.response.data.error.message);
        } else {
          setErrorMessage("Неизвестная ошибка");
        }
      }
    }
  };

  const deleteInventory = async () => {
    await boxApi.deleteInventory(props.inventory.id);

    props.close();
  };

  const updateInventory = async () => {
    await boxApi.putInventory({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      chanceWining: 0,
      itemId: item.id,
      boxId: box.id,
    });

    props.close();
  };

  const createInventory = async () => {
    await boxApi.postInventory({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      chanceWining: 0,
      itemId: item.id,
      boxId: box.id,
    });

    props.close();
  };

  const operations = {
    "create-inventory": createInventory,
    "delete-inventory": deleteInventory,
    "update-inventory": updateInventory,
  };

  return (
    <div className={styles.box_inventory}>
      <div className={styles.inventory_content}>
        <div className={styles.inventory_header}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.tittle}>Инвентарь кейса</div>
        </div>
        <div className={styles.inventory_info}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <img
                alt=""
                src={item?.image ?? ItemImage}
                className={styles.image}
                onClick={() => {
                  if (props.setItem) props.setItem(item);
                }}
              />
              <Input
                name="item"
                placeholder="Название предмета"
                isReadOnly={!user?.role || user?.role === "user"}
                value={item?.name}
                setValue={(v) => setItem({ ...item, name: v })}
              />
            </div>
            <div className={styles.input}>
              <img
                alt=""
                src={box?.image ?? BoxImage}
                className={styles.image}
                onClick={() => {
                  if (props.setBox) props.setBox(box);
                }}
              />
              <Input
                name="box"
                placeholder="Название коробки"
                isReadOnly={true}
                value={box?.name}
              />
            </div>
            <Input
              name="chance"
              placeholder="Шанс"
              isReadOnly={true}
              value={`~ ${(props.inventory?.chanceWining || 0) / 100000} %`}
            />
          </div>
          <div className={styles.delimiter}></div>
          {user?.role && user?.role !== "user" ? (
            <div className={styles.inventory_buttons}>
              {backOperation === null ? (
                <div
                  className={styles.button_send}
                  onClick={async () => await buttonClick()}
                >
                  {props.inventory?.chanceWining ? "Изменить" : "Создать"}
                </div>
              ) : null}
              {props.inventory?.chanceWining && backOperation === null ? (
                <div
                  className={styles.button_delete}
                  onClick={async () => await buttonClick(true)}
                >
                  Удалить
                </div>
              ) : null}
              {backOperation !== null ? (
                <div
                  className={styles.button_back}
                  onClick={async () => await buttonClick()}
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

export default BoxInventory;
