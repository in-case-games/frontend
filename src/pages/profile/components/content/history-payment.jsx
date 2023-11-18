import React, { useState } from "react";
import {
  Modal as ModalLayout,
  Inventory as InventoryLayout,
} from "../../../../layouts";
import { HistoryPayment as HistoryPaymentWindow } from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { User as UserApi } from "../../../../api";
import { Payment } from "../../../../components/history";
import styles from "./content.module";

const HistoryPayment = () => {
  const userApi = new UserApi();

  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState();

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
        <Payment id={h.id} history={h} click={() => setHistory(h)} key={h.id} />
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

  return (
    <div className={styles.history_payment}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>История пополнения: </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={userApi.getPayments}
          quantityPerPage={20}
        />
      </div>
      <ModalLayout isActive={history} close={() => setHistory()}>
        <HistoryPaymentWindow history={history} close={() => setHistory()} />
      </ModalLayout>
    </div>
  );
};

export default HistoryPayment;
