import React, { useState } from "react";
import { Promocode as History } from "../../../../components/history";
import {
  Inventory as InventoryLayout,
  Modal as ModalLayout,
} from "../../../../layouts";
import { HistoryPromocode as HistoryPromocodeWindow } from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { User as UserApi } from "../../../../api";
import styles from "./content.module";
import { Input } from "../../../../components/common/inputs";
import { AirplaneBlack as Airplane } from "../../../../assets/images/icons";

const HistoryPromocode = () => {
  const userApi = new UserApi();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApply, setIsApply] = useState(false);
  const [history, setHistory] = useState();
  const [name, setName] = useState();

  const [user, setUser] = useState();

  const additionalLoading = async (array, start, end) => {
    const loaded = [];
    const u = user || (await loadedUser());

    for (let i = start; i < end; i++) {
      array[i].user = u;
      loaded.push(array[i]);
    }

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [];

    for (let j = start; j < end; j++) {
      const h = array[j];

      result.push(
        <History id={h.id} click={() => setHistory(h)} history={h} key={h.id} />
      );
    }

    return result;
  };

  const loadedUser = async () => {
    const user = await userApi.get();
    user.image = await userApi.getImage();

    setUser(user);

    return user;
  };

  const click = async () => {
    let er = null;
    let apply = false;

    try {
      await userApi.activatePromocode(name);
      apply = true;
    } catch (ex) {
      er = ex.response.data.error.message;

      if (ex.response.data.error.code !== 4) {
        try {
          await userApi.exchangePromocode(name);
          er = null;
          apply = true;
          setIsLoading(true);
        } catch (ex) {
          er = ex.response.data.error.message;
        }
      }
    }

    if (er !== null) console.log(er);

    setError(er);
    setIsApply(apply);
  };

  return (
    <div className={styles.history_promocode}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>История промокодов: </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.input}>
            <Input
              name="promocode-name"
              placeholder="Промокод"
              value={name}
              setValue={setName}
              isApply={isApply}
              isError={error !== null}
            />
          </div>
          <div className={styles.button_send} onClick={click}>
            <img alt="" src={Airplane} className={styles.image} />
            <div className={styles.text}>Применить</div>
          </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={userApi.getPromocodes}
          quantityPerPage={20}
        />
      </div>
      <ModalLayout isActive={history} close={() => setHistory()}>
        <HistoryPromocodeWindow history={history} close={() => setHistory()} />
      </ModalLayout>
    </div>
  );
};

export default HistoryPromocode;
