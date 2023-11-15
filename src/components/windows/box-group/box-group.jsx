import React, { useEffect, useState } from "react";
import { BoxGroup as BoxGroupApi, Game as GameApi } from "../../../api";
import { Input, ComboBox } from "../../common/inputs";
import styles from "./box-group.module";

const BoxGroup = (props) => {
  const boxGroupApi = new BoxGroupApi();
  const gameApi = new GameApi();

  const [group, setGroup] = useState();
  const [games, setGames] = useState([]);
  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (games.length === 0) {
        const res = [];
        res.push({
          id: 1,
          name: undefined,
        });
        setGames(res.concat(await gameApi.get()));
      }
      if (!group && props.group?.id) {
        const result = props.group;
        const select = [];
        result.components = [];

        const groups = await boxGroupApi.getByGroupId(props.group?.id);

        for (let i = 0; i < groups.length; i++) {
          select.push(groups[i].box);
          result.components.push({
            id: groups[i].id,
            box: groups[i].box,
          });
          result.game = groups[i].game.name;
        }

        props.setSelectBoxes((prev) => ({ ...prev, boxes: select }));
        setGroup(result);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation) {
        let temp = backOperation - 1;
        temp = temp >= 0 ? temp : 0;

        setBackOperation(temp);

        if (temp === 0) {
          await operations[operation]();

          setOperation(null);
          setBackOperation(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const buttonClick = async (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation();
      setOperation();
    } else if (!backOperation) {
      try {
        if (isDelete) setOperation("delete-group");
        else if (props.group?.id) setOperation("update-group");
        else setOperation("create-group");

        setBackOperation(5);
      } catch (ex) {}
    }
  };

  const deleteGroup = async () => {
    await boxGroupApi.delete(group.id);

    setGroup();
    props.close();
  };

  const updateGroup = async () => {
    const res = await boxGroupApi.put(group);

    props.setGroup(res);
    setGroup(res);
  };

  const createGroup = async () => {
    const res = await boxGroupApi.post(group);

    props.setGroup(res);
    setGroup(res);
  };

  const operations = {
    "create-group": createGroup,
    "delete-group": deleteGroup,
    "update-group": updateGroup,
  };

  return (
    <div className={styles.box_group}>
      <div className={styles.group_content}>
        <div className={styles.group_header}>
          <div className={styles.tittle}>Группа кейсов</div>
        </div>
        <div className={styles.group_info}>
          <Input
            name="group-name"
            placeholder="Название"
            subTittle="Название:"
            isReadOnly={false}
            value={group?.name}
            setValue={(value) => setGroup({ ...group, name: value })}
          />
          <div className={styles.delimiter}></div>
          <div className={styles.component}>
            <ComboBox
              name="group-game"
              subTittle="Игра:"
              placeholder="Игра"
              isReadOnly={false}
              value={group?.game}
              values={games}
              setValue={(value) => setGroup({ ...group, game: value })}
            />
            <div
              className={styles.button_add}
              onClick={() => {
                if (props.setShowBoxesWindow && group?.game) {
                  props.setShowBoxesWindow(
                    games.find((g) => g.name === group.game).id
                  );
                }
              }}
            >
              Кейсы
            </div>
          </div>
          <div className={styles.delimiter}></div>
          <div className={styles.buttons}>
            {!backOperation ? (
              <div
                className={styles.button_send}
                onClick={async () => await buttonClick()}
              >
                {group?.id ? "Изменить" : "Создать"}
              </div>
            ) : null}
            {group?.id && !backOperation ? (
              <div
                className={styles.button_delete}
                onClick={async () => await buttonClick(true)}
              >
                Удалить
              </div>
            ) : null}
            {backOperation ? (
              <div
                className={styles.button_back}
                onClick={async () => await buttonClick()}
              >
                <div className={styles.text}>Вернуть</div>
                <div className={styles.timer}>{backOperation}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxGroup;
