import React, { useEffect, useState } from "react";
import { TemplateBox as BoxImage } from "../../../assets/images/main";
import { Link } from "../../../assets/images/icons";
import { Box as BoxApi, Game as GameApi } from "../../../api";
import { Input, ComboBox } from "../../common/inputs";
import { LoadingArrow as Loading } from "../../loading";
import { Handler } from "../../../helpers/handler";
import Constants from "../../../constants";
import TokenService from "../../../services/token";
import styles from "./box.module";

const Box = (props) => {
  const boxApi = new BoxApi();
  const gameApi = new GameApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isBlockRefresh, setIsBlockRefresh] = useState(false);

  const [backOperation, setBackOperation] = useState(null);
  const [operation, setOperation] = useState(null);

  const [user, setUser] = useState(TokenService.getUser());
  const [box, setBox] = useState(
    props.box?.id ? props.box : Constants.TemplateBox
  );
  const [errorMessage, setErrorMessage] = useState();
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  const [games, setGames] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setIsLoading(!isBlockRefresh), 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isLoading) {
        await Handler.error(
          async () => {
            setUser(TokenService.getUser());
            setBox(
              props.box?.id
                ? await boxApi.getById(props.box?.id)
                : Constants.TemplateBox
            );
            setGames(await gameApi.get());
            setIsLoading(false);
          },
          undefined,
          setErrorMessage,
          penaltyDelay,
          setPenaltyDelay,
          "BOX"
        );
      }
    }, 100 + penaltyDelay);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation !== null) {
        let temp = backOperation - 1;
        temp = temp >= 0 ? temp : 0;

        setBackOperation(temp);

        if (temp === 0) {
          await Handler.error(
            async () => await operations[operation](),
            undefined,
            setErrorMessage
          );
          setOperation(null);
          setBackOperation(null);
          setIsLoading(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const buttonClick = (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation(null);
      setOperation(null);
    } else if (backOperation === null) {
      setBackOperation(5);

      if (isDelete) setOperation("delete-box");
      else if (box?.id) setOperation("update-box");
      else setOperation("create-box");
    }
  };

  const handleSetBox = (box) => {
    setIsBlockRefresh(true);
    setBox(box);
  };

  const deleteBox = async () => {
    await boxApi.delete(box.id);

    props.setImage(null);
    props.setBox(null);
    setBox(Constants.TemplateBox);
    setIsBlockRefresh(false);
    setIsLoading(true);
  };

  const updateBox = async () => {
    box.image = props.image;
    box.gameId = games.find((g) => g.name === box.game).id;

    const response = await boxApi.put(box);

    response.game = box.game;
    response.image = props.image || props.box?.image;

    props.setImage(null);
    props.setBox(response);
    setBox(response);
    setIsBlockRefresh(false);
    setIsLoading(true);
  };

  const createBox = async () => {
    box.image = props.image;
    box.gameId = games.find((g) => g.name === box.game).id;

    const response = await boxApi.post(box);

    response.game = box.game;
    response.image = props.image || props.box?.image;

    props.setImage(null);
    props.setBox(response);
    setBox(response);
    setIsBlockRefresh(false);
    setIsLoading(true);
  };

  const operations = {
    "create-box": createBox,
    "delete-box": deleteBox,
    "update-box": updateBox,
  };

  return (
    <div className={styles.box}>
      <div className={styles.box_content}>
        <div className={styles.box_header}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setIsLoading={() => {
                setIsBlockRefresh(false);
                setIsLoading(true);
                props.setImage(null);
              }}
            />
          </div>
          <div className={styles.tittle}>Информация по кейсу</div>
          {props.box.id ? (
            <a
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              href={`/box/${props.box.id}`}
            >
              <img className={styles.image} alt="" src={Link} />
            </a>
          ) : null}
        </div>
        <div className={styles.error}>{errorMessage}</div>
        <div className={styles.box_info}>
          <div className={styles.box_display}>
            <img
              className={styles.image}
              onClick={() => props.openLoadWindow(user?.role === "owner")}
              style={{ cursor: user?.role === "owner" ? "pointer" : "default" }}
              alt=""
              src={props?.image || props?.box?.image || BoxImage}
            />
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.tittle}>Подробная информация</div>
          <div className={styles.inputs}>
            <Input
              subTittle="Название:"
              name="box-name"
              placeholder="Название"
              value={box?.name}
              setValue={(value) => handleSetBox({ ...box, name: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <Input
              subTittle="Стоимость:"
              name="box-cost"
              placeholder="Стоимость"
              value={box?.cost}
              setValue={(value) => handleSetBox({ ...box, cost: value })}
              isReadOnly={user?.role !== "owner"}
            />
            <Input
              subTittle="Доступен:"
              name="box-is-locked"
              placeholder="Доступен"
              value={box?.isLocked || !box?.id ? "Нет" : "Да"}
              setValue={() => {}}
              isReadOnly={true}
            />
            <ComboBox
              subTittle="Игра:"
              name="box-game"
              placeholder="Игра"
              value={box?.game}
              values={games}
              setValue={(value) => handleSetBox({ ...box, game: value })}
              isReadOnly={user?.role !== "owner"}
            />
          </div>
          {user?.role === "owner" ? (
            <div className={styles.box_buttons}>
              {backOperation === null ? (
                <div
                  className={styles.button_send}
                  onClick={() => buttonClick()}
                >
                  {box?.id ? "Изменить" : "Создать"}
                </div>
              ) : null}
              {box?.id && backOperation === null ? (
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

export default Box;
