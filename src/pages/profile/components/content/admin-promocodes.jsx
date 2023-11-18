import React, { useState } from "react";
import {
  Modal as ModalLayout,
  Inventory as InventoryLayout,
} from "../../../../layouts";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Promocode as PromocodeApi } from "../../../../api";
import { Promocode } from "../../../../components/history";
import { Promocode as PromocodeWindow } from "../../../../components/windows";
import styles from "./content.module";

const AdminPromocodes = (props) => {
  const promocodeApi = new PromocodeApi();

  const [isLoading, setIsLoading] = useState(true);
  const [promo, setPromo] = useState();

  const additionalLoading = async (array, start, end) => {
    const loaded = [];

    for (let i = start; i < end; i++) loaded.push(array[i]);

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [];

    result.push(<Promocode id="112" click={() => setPromo({})} key="112" />);

    for (let j = start; j < end; j++) {
      const p = array[j];

      result.push(
        <Promocode
          id={p.id}
          click={() => setPromo(p)}
          promocode={p}
          key={p.id}
        />
      );
    }

    return result;
  };

  return (
    <div className={styles.admin_promocode}>
      <div className={styles.profile_tittle}>
        <div className={styles.tittle}>
          <div
            className={styles.profile_back}
            onClick={() => props.exchange("admin")}
          >
            ←
          </div>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Промокоды: </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={promocodeApi.get}
          quantityPerPage={20}
        />
      </div>
      <ModalLayout
        isActive={promo}
        close={() => {
          setPromo();
          setIsLoading(true);
        }}
      >
        <PromocodeWindow
          promo={promo}
          setPromo={setPromo}
          close={() => {
            setPromo();
            setIsLoading(true);
          }}
        />
      </ModalLayout>
    </div>
  );
};

export default AdminPromocodes;
