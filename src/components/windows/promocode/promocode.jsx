import React, { useEffect, useState } from "react";
import { Promocode as PromocodeApi } from "../../../api";
import { Input, ComboBox } from "../../common/inputs";
import { Converter } from "../../../helpers/converter";
import { Handler } from "../../../helpers/handler";
import styles from "./promocode.module";

const Promocode = (props) => {
  const promocodeApi = new PromocodeApi();

  const [penaltyDelay, setPenaltyDelay] = useState(0);
  const [promo, setPromo] = useState();
  const [type, setType] = useState("box");
  const [types, setTypes] = useState([]);
  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () =>
        await Handler.error(
          async () => {
            if (!types || types.length === 0)
              setTypes(await promocodeApi.getTypes());
            if (!promo && props.promo?.id) {
              const result = await promocodeApi.getByName(props.promo.name);

              setType(result?.type?.name);
              setPromo(result);
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
    } else if (!backOperation && promo) {
      await Handler.error(async () => {
        promo.typeId = types.find((p) => type === p.name).id;
        promo.expirationDate = new Date(promo.expirationDate);

        if (isDelete) setOperation("delete-promo");
        else if (props.promo?.id) setOperation("update-promo");
        else setOperation("create-promo");

        setBackOperation(5);
        setPromo(promo);
      });
    }
  };

  const deletePromo = async () => {
    await promocodeApi.delete(promo.id);

    setPromo();
    props.close();
  };

  const updatePromo = async () => {
    const res = await promocodeApi.put(promo);

    props.setPromo(res);
    setPromo();
  };

  const createPromo = async () => {
    const res = await promocodeApi.post(promo);

    props.setPromo(res);
    setPromo();
  };

  const operations = {
    "create-promo": createPromo,
    "delete-promo": deletePromo,
    "update-promo": updatePromo,
  };

  return (
    <div className={styles.promo}>
      <div className={styles.promo_content}>
        <div className={styles.promo_header}>
          <div className={styles.tittle}>Промокод</div>
        </div>
        <div className={styles.promo_info}>
          <Input
            name="promo-name"
            placeholder="Название"
            subTittle="Название:"
            value={promo?.name}
            setValue={(value) => setPromo({ ...promo, name: value })}
          />
          <Input
            name="promo-discount"
            placeholder="Скидка"
            subTittle="Скидка:"
            value={promo?.discount}
            setValue={(value) => setPromo({ ...promo, discount: value })}
          />
          <Input
            name="promo-number-activations"
            placeholder="Активаций"
            subTittle="Активаций:"
            value={promo?.numberActivations}
            setValue={(value) =>
              setPromo({ ...promo, numberActivations: value })
            }
          />
          <ComboBox
            subTittle="Тип:"
            name="promo-type"
            placeholder="Тип"
            value={type}
            values={types}
            setValue={(value) => setType(value)}
          />
          <Input
            name="promo-expiration-date"
            subTittle="Дата истечения:"
            placeholder="Дата истечения"
            type="datetime-local"
            value={Converter.getDateIso(
              new Date(promo?.expirationDate || new Date()).toISOString()
            )}
            setValue={(value) => setPromo({ ...promo, expirationDate: value })}
          />
          <div className={styles.delimiter}></div>
          <div className={styles.buttons}>
            {!backOperation ? (
              <div
                className={styles.button_send}
                onClick={async () => await buttonClick()}
              >
                {promo?.id ? "Изменить" : "Создать"}
              </div>
            ) : null}
            {promo?.id && !backOperation ? (
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

export default Promocode;
