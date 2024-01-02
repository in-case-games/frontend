import React, { useEffect, useState } from "react";
import { TemplateUser as UserImage } from "../../../assets/images/main";
import { Restriction as RestrictionApi, User as UserApi } from "../../../api";
import { useNavigate } from "react-router-dom";
import { Input, ComboBox } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import { Handler } from "../../../helpers/handler";
import TokenService from "../../../services/token";
import styles from "./restriction.module";

const Restriction = (props) => {
  const restrictionApi = new RestrictionApi();
  const userApi = new UserApi();
  const observerRole = TokenService.getUser()?.role || "user";
  const navigate = useNavigate();

  const [restriction, setRestriction] = useState();
  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();

  const [type, setType] = useState();
  const [types, setTypes] = useState();
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      async () =>
        await Handler.error(
          async () => {
            if (!types) setTypes(await restrictionApi.getTypes());
            if (!type) setType(props.restriction?.type?.name || "warn");
            if (!restriction) {
              if (props.restriction && !props.restriction?.owner) {
                setRestriction({
                  owner: TokenService.getUser(),
                  creationDate: new Date(),
                  expirationDate: new Date(),
                });
              } else setRestriction(props.restriction);
            }
          },
          undefined,
          undefined,
          penaltyDelay,
          setPenaltyDelay
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
          await Handler.error(async () => await operations[operation]());

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
      await Handler.error(async () => {
        restriction.userId = (
          await userApi.getByLogin(restriction?.user?.login)
        ).id;
        restriction.expirationDate = new Date(restriction.expirationDate);
        restriction.creationDate = new Date(restriction.creationDate);

        if (isDelete) setOperation("delete-restriction");
        else if (restriction?.id) setOperation("update-restriction");
        else setOperation("create-restriction");

        setBackOperation(5);
      });
    }
  };

  const deleteRestriction = async () => {
    await restrictionApi.delete(restriction.id);

    setRestriction();
    props.close();
  };

  const updateRestriction = async () => {
    restriction.typeId = types.find((t) => t.name === type).id;

    const res = await restrictionApi.put(restriction);
    res.owner = restriction.owner;
    res.user = restriction.user;

    props.setRestriction(res);
    setRestriction(res);
  };

  const createRestriction = async () => {
    restriction.typeId = types.find((t) => t.name === type).id;

    const res = await restrictionApi.post(restriction);
    res.owner = restriction.owner;
    res.user = restriction.user;

    props.setRestriction(res);
    setRestriction(res);
  };

  const operations = {
    "create-restriction": createRestriction,
    "delete-restriction": deleteRestriction,
    "update-restriction": updateRestriction,
  };

  return (
    <div className={styles.restriction}>
      <div className={styles.restriction_content}>
        <div className={styles.restriction_header}>
          <div className={styles.tittle}>Ограничение</div>
        </div>
        <div className={styles.restriction_info}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <img
                alt=""
                src={restriction?.user?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  if (restriction?.user?.id) {
                    navigate(`/profile/${restriction?.user?.id}`);
                    props.close();
                  }
                }}
              />
              <Input
                name="restriction-user"
                placeholder="Логин пользователя"
                isReadOnly={observerRole === "user"}
                value={restriction?.user?.login}
                setValue={(value) =>
                  setRestriction({
                    ...restriction,
                    user: { ...restriction.user, login: value },
                  })
                }
              />
            </div>
            <div className={styles.input}>
              <img
                alt=""
                src={restriction?.owner?.image ?? UserImage}
                className={styles.image}
                onClick={() => {
                  navigate(`/profile/${restriction?.owner?.id}`);
                  props.close();
                }}
              />
              <Input
                name="restriction-owner"
                placeholder="Логин создателя"
                isReadOnly={true}
                value={restriction?.owner?.login + " - Создатель"}
              />
            </div>
            <Input
              name="restriction-creation-date"
              subTittle="Дата создания:"
              placeholder="Дата создания"
              isReadOnly={observerRole === "user"}
              type="datetime-local"
              value={Converter.getDateIso(
                new Date(restriction?.creationDate || new Date()).toISOString()
              )}
              setValue={(value) =>
                setRestriction({ ...restriction, creationDate: value })
              }
            />
            <Input
              name="restriction-expiration-date"
              subTittle="Дата истечения:"
              placeholder="Дата истечения"
              isReadOnly={observerRole === "user"}
              type="datetime-local"
              value={Converter.getDateIso(
                new Date(
                  restriction?.expirationDate || new Date()
                ).toISOString()
              )}
              setValue={(value) =>
                setRestriction({ ...restriction, expirationDate: value })
              }
            />
            <ComboBox
              subTittle="Тип:"
              name="restriction-type"
              placeholder="Тип"
              isReadOnly={observerRole === "user"}
              value={type}
              values={types}
              setValue={setType}
            />
            <Input
              name="restriction-description"
              placeholder="Описание"
              isReadOnly={observerRole === "user"}
              value={restriction?.description}
              setValue={(value) =>
                setRestriction({ ...restriction, description: value })
              }
            />
          </div>
          <div className={styles.delimiter}></div>
          {observerRole !== "user" ? (
            <div className={styles.buttons}>
              {!backOperation ? (
                <div
                  className={styles.button_send}
                  onClick={async () => await buttonClick()}
                >
                  {restriction?.id ? "Изменить" : "Создать"}
                </div>
              ) : null}
              {restriction?.id && !backOperation ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Restriction;
