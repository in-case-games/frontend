import React, { useEffect, useState } from "react";
import { BoxGroup as BoxGroupApi, Game as GameApi } from "../../../api";
import { Input, ComboBox } from "../../common/inputs";
import { Handler } from "../../../helpers/handler";
import styles from "./box-group.module";

const BoxGroup = (props) => {
  const boxGroupApi = new BoxGroupApi();
  const gameApi = new GameApi();

  const [penaltyDelay, setPenaltyDelay] = useState(0);
  const [group, setGroup] = useState();
  const [games, setGames] = useState([]);
  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () =>
        await Handler.error(
          async () => {
            if (games.length === 0) {
              const res = [];
              res.push({
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
          },
          undefined,
          undefined,
          penaltyDelay,
          setPenaltyDelay,
          "BOX_GROUP"
        ),
      100 + penaltyDelay
    );

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation) {
        let temp = backOperation - 1;
        temp = temp >= 0 ? temp : 0;

        setBackOperation(temp);

        if (temp === 0) {
          setOperation(null);
          setBackOperation(null);
          await Handler.error(async () => await operations[operation]());
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const buttonClick = async (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation();
      setOperation();
    } else if (!backOperation && group?.game) {
      if (isDelete) setOperation("delete-group");
      else if (props.group?.id) setOperation("update-group");
      else setOperation("create-group");

      setBackOperation(5);
    }
  };

  const deleteGroup = async () => {
    await boxGroupApi.delete(group.id);

    setGroup();
    props.close();
  };

  const updateGroup = async () => {
    const deleted = [];
    const selected = props.selectBoxes.boxes;
    const gameId = games.find((g) => g.name === group.game).id;
    const res = await boxGroupApi.put(group);

    for (let i = 0; i < group.components.length; i++) {
      const component = group.components[i];
      const index = selected.findIndex((b) => b.name === component.box.name);

      if (index > -1) selected.splice(index, 1);
      else deleted.push(component);
    }

    for (let i = 0; i < selected.length; i++) {
      try {
        await boxGroupApi.postItem({
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          boxId: selected[i].id,
          gameId: gameId,
          groupId: res.id,
        });
      } catch (ex) {
        console.log(ex);
      }
    }

    for (let i = 0; i < deleted.length; i++) {
      try {
        await boxGroupApi.deleteItem(deleted[i].id);
      } catch (ex) {
        console.log(ex);
      }
    }

    props.setGroup(res);
    setGroup();
  };

  const createGroup = async () => {
    const selected = props.selectBoxes.boxes;
    const gameId = games.find((g) => g.name === group.game).id;
    const res = await boxGroupApi.post(group);

    for (let i = 0; i < selected.length; i++) {
      try {
        await boxGroupApi.postItem({
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          boxId: selected[i].id,
          gameId: gameId,
          groupId: res.id,
        });
      } catch (ex) {
        console.log(ex);
      }
    }

    props.setGroup(res);
    setGroup();
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
