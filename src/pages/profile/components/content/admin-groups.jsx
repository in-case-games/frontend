import React, { useState } from "react";
import {
  Modal as ModalLayout,
  Inventory as InventoryLayout,
} from "../../../../layouts";
import {
  BoxGroup as BoxGroupWindow,
  Boxes as BoxesWindow,
} from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { BoxGroup as BoxGroupApi } from "../../../../api";
import { BoxGroup } from "../../../../components/box-group";
import styles from "./content.module";

const AdminGroups = (props) => {
  const boxGroupApi = new BoxGroupApi();

  const [isLoading, setIsLoading] = useState(true);
  const [gameId, setGameId] = useState(false);
  const [group, setGroup] = useState();
  const [selectBoxes, setSelectBoxes] = useState({ id: "", boxes: [] });

  const additionalLoading = async (array, start, end) => {
    const loaded = [];

    for (let i = start; i < end; i++) loaded.push(array[i]);

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [];

    result.push(<BoxGroup showWindow={() => setGroup({})} key="5123" />);

    for (let j = start; j < end; j++) {
      const g = array[j];

      result.push(
        <BoxGroup id={g.id} group={g} showWindow={setGroup} key={g.id} />
      );
    }

    return result;
  };

  return (
    <div className={styles.admin_groups}>
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
          <div className={styles.name}>Группы кейсов: </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={boxGroupApi.get}
          quantityPerPage={20}
        />
      </div>
      <ModalLayout
        isActive={group}
        close={() => {
          setGroup();
          setSelectBoxes({ id: "", boxes: [] });
          setIsLoading(true);
        }}
      >
        <BoxGroupWindow
          group={group}
          selectBoxes={selectBoxes}
          setGroup={setGroup}
          setSelectBoxes={setSelectBoxes}
          setShowBoxesWindow={setGameId}
          close={() => {
            setGroup();
            setSelectBoxes({ id: "", boxes: [] });
            setIsLoading(true);
          }}
        />
      </ModalLayout>
      <ModalLayout
        isActive={gameId}
        close={() => {
          setGameId();
          setIsLoading(true);
        }}
      >
        <BoxesWindow
          gameId={gameId}
          selectBoxes={selectBoxes}
          setSelectBoxes={setSelectBoxes}
          close={() => {
            setGameId();
            setIsLoading(true);
          }}
        />
      </ModalLayout>
    </div>
  );
};

export default AdminGroups;
