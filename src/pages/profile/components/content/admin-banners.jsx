import React, { useState } from "react";
import {
  Modal as ModalLayout,
  Inventory as InventoryLayout,
} from "../../../../layouts";
import {
  Banner as BannerWindow,
  LoadImage as LoadImageWindow,
} from "../../../../components/windows";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Box as BoxApi } from "../../../../api";
import { BoxGroup } from "../../../../components/box-group";
import styles from "./content.module";

const AdminBanner = (props) => {
  const boxApi = new BoxApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);
  const [banner, setBanner] = useState();
  const [image, setImage] = useState();

  const additionalLoading = async (array, start, end) => {
    const loaded = [];

    for (let i = start; i < end; i++) loaded.push(array[i]);

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [];

    result.push(<BoxGroup showWindow={() => setBanner({})} key="5123" />);

    for (let j = start; j < end; j++) {
      const b = array[j];
      const group = {
        id: b.id,
        name: b.box.name,
      };

      result.push(
        <BoxGroup id={b.id} group={group} showWindow={setBanner} key={b.id} />
      );
    }

    return result;
  };

  return (
    <div className={styles.admin_banner}>
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
          <div className={styles.name}>Баннеры к кейсам </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <InventoryLayout
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          additionalLoading={additionalLoading}
          createShowByLoaded={createShowByLoaded}
          loadPrimary={boxApi.getBanners}
          quantityPerPage={20}
        />
      </div>
      <ModalLayout
        isActive={banner}
        close={() => {
          setBanner();
          setImage();
          setIsLoading(true);
        }}
      >
        <BannerWindow
          image={image}
          openLoadWindow={setIsOpenLoadWindow}
          banner={banner}
          setBanner={setBanner}
          close={() => {
            setBanner();
            setImage();
            setIsLoading(true);
          }}
        />
      </ModalLayout>
      <ModalLayout
        isActive={isOpenLoadWindow}
        close={() => setIsOpenLoadWindow(false)}
      >
        <LoadImageWindow
          file={image}
          setFile={setImage}
          width={1000}
          height={400}
          sizeMb={4}
          regular={/\.(jpg|jpeg|png)$/}
          description={"JPEG,JPG,PNG (MAX. 1000x400px | 4MB)"}
        />
      </ModalLayout>
    </div>
  );
};

export default AdminBanner;
