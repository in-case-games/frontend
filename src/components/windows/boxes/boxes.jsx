import React, { useEffect, useState } from "react";
import { Box as BoxIcon } from "../../../assets/images/icons";
import { Box as BoxApi } from "../../../api";
import { Simple as Box } from "../../loot-box";
import { LoadingArrow as Loading } from "../../loading";
import { Input } from "../../common/inputs";
import { Handler } from "../../../helpers/handler";
import styles from "./boxes.module";

const Boxes = (props) => {
  const boxApi = new BoxApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isClickBox, setIsClickBox] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  const [search, setSearch] = useState("");

  const [penaltyDelay, setPenaltyDelay] = useState(0);
  const [primaryBoxes, setPrimaryBoxes] = useState([]);
  const [showBoxes, setShowBoxes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setIsLoading(true), 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const loaded = async (isAllReload) => {
        setIsBanned(true);

        const show = [];
        let primary = primaryBoxes;

        if (isAllReload) {
          primary = await boxApi.getByGameId(props.gameId);
          setPrimaryBoxes(primary);
        }

        for (let i = 0; i < props.selectBoxes.boxes.length; i++)
          show.push(await boxApi.pushImage(props.selectBoxes.boxes[i]));

        const lowerSearch = search.toLowerCase();

        for (let i = 0; i < primary.length; i++) {
          const box = await boxApi.pushImage(primary[i]);
          const lowerName = box.name.toLowerCase();
          const isStartsWith = lowerName.startsWith(lowerSearch);
          const isExist = show.find((s) => s.name === box.name);

          if (isExist) continue;
          else if (lowerSearch === "" || isStartsWith) show.push(box);
        }

        setShowBoxes(show);
      };
      if (!isBanned && (isLoading || isClickBox)) {
        await Handler.error(
          async () => {
            await loaded(isLoading);

            setIsClickBox(false);
            setIsLoading(false);
            setIsBanned(false);
          },
          undefined,
          undefined,
          penaltyDelay,
          setPenaltyDelay,
          "BOXES"
        );
        setIsBanned(false);
      }
    }, 100 + penaltyDelay);

    return () => clearInterval(interval);
  });

  const inputSearch = (value) => {
    if (!isLoading && !isBanned && !isClickBox) {
      const show = [];
      const lowerValue = value.toLowerCase();

      for (let i = 0; i < props.selectBoxes.boxes.length; i++)
        show.push(props.selectBoxes.boxes);

      primaryBoxes.forEach((b) => {
        const lowerName = b.name.toLowerCase();
        const isStartsWith = lowerName.startsWith(lowerValue);

        if (lowerValue === "" || isStartsWith) show.push(b);
      });

      setSearch(value);
      setShowBoxes(show);
    }
  };

  return (
    <div className={styles.boxes}>
      <div className={styles.boxes_content}>
        <div className={styles.boxes_header}>
          <div className={styles.loading}>
            <Loading isLoading={isLoading} click={() => {}} cursor="default" />
          </div>
          <div className={styles.tittle}>Выбор кейсов</div>
        </div>
        <div className={styles.delimiter}></div>
        <div className={styles.search}>
          <Input
            maxLength={50}
            placeholder="Название кейса"
            name="search-box"
            value={search}
            setValue={inputSearch}
          />
        </div>
        {showBoxes.length > 0 ? (
          <div
            className={styles.boxes}
            style={
              showBoxes.length > 3
                ? { overflowY: "scroll" }
                : { overflowY: "hidden" }
            }
          >
            {showBoxes.map((b) => (
              <Box
                id={b.id}
                box={b}
                selectBoxes={props.selectBoxes}
                select={() => {
                  const selected = props.selectBoxes.boxes;
                  const index = selected.findIndex((s) => s.id === b.id);

                  if (index === -1) selected.push(b);
                  else selected.splice(index, 1);

                  props.setSelectBoxes((prev) => ({
                    ...prev,
                    boxes: selected,
                  }));
                  setIsClickBox(true);
                }}
                key={b.id}
              />
            ))}
          </div>
        ) : (
          <div className={styles.not_found}>Кейсы не найдены</div>
        )}
        <div className={styles.delimiter}></div>
        <div className={styles.boxes_counters}>
          <div className={styles.counter} style={{ background: "green" }}>
            <div className={styles.counter_tittle}>
              {props.selectBoxes.boxes.length}
            </div>
            <img src={BoxIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
