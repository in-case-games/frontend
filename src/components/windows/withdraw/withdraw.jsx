import React, { useEffect, useState } from "react";
import { Item as ItemApi, User as UserApi } from "../../../api";
import { Simple as Item } from "../../game-item";
import { LoadingArrow as Loading } from "../../loading";
import Constants from "../../../constants";
import TradeUrlService from "../../../services/trade-url";
import styles from "./withdraw.module";

const Withdraw = (props) => {
  const itemApi = new ItemApi();

  const [finishedInventories, setFinishedInventories] = useState({ items: [] });
  const [remainingInventories, setRemainingInventories] = useState({
    items: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isApply, setIsApply] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isDisplayedButton, setIsDisplayedButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [penaltyDelay, setPenaltyDelay] = useState(0);

  const isValidTradeUrls = () => {
    let error = null;
    const checked = [];

    for (let i = 0; i < remainingInventories.items.length; i++) {
      const game = remainingInventories?.items[i]?.item?.game;

      if (checked.indexOf(game) === -1) {
        const isValid = TradeUrlService.IsValidTradeUrlByGame(game);
        checked.push(game);

        if (!isValid)
          error = error ?? "Измените трейд ссылки в профиле: " + game;
      }
    }

    setError(error);

    return error === null;
  };

  const zeroingOutStatusAndErrorsItems = (items) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].status !== "success") {
        items[i].status = "wait";
        items[i].error = null;
      }
    }

    return items;
  };

  const click = () => {
    if (isValidTradeUrls()) {
      setIsDisplayedButton(false);
      setIsBanned(true);
      setIsLoading(true);
      loader();
    }
  };

  const loader = async () => {
    let items = zeroingOutStatusAndErrorsItems(finishedInventories.items);

    setFinishedInventories((prev) => ({
      ...prev,
      items: items,
    }));

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const selected = props.selectItems.items;
      let error = false;

      await errorHandler(
        async () => {
          if (item.status !== "success") {
            items[i].status = "loading";
            setFinishedInventories((prev) => ({
              ...prev,
              items: items,
            }));

            const index = selected.indexOf(item.id);

            await itemApi.withdraw(
              item.id,
              TradeUrlService.GetUrlByGame[item.item.game]()
            );

            items[i].status = "success";
            setFinishedInventories((prev) => ({
              ...prev,
              items: items,
            }));

            removeSelectItem(index, item);
          }
        },
        async () => {
          const code = err.response.data.error.code;

          items[i].status = "cancel";
          items[i].error =
            Constants.WithdrawErrors[code] === undefined
              ? "Подождите или напишите в тех. поддержку"
              : Constants.WithdrawErrors[code];

          setFinishedInventories((prev) => ({
            ...prev,
            items: items,
          }));

          if (code === 4) {
            const index = props.selectItems.items.indexOf(item.id);

            items.push(item);

            removeSelectItem(index);
          } else if (code === 5) {
            items[i].status = "exchange";

            setFinishedInventories((prev) => ({
              ...prev,
              items: items,
            }));
          } else error = true;
        }
      );

      if (error) break;
    }
    setIsLoading(false);
    setIsBanned(false);
  };

  const removeSelectItem = (index) => {
    if (index > -1) {
      let selected = props.selectItems.items;
      selected.splice(index, 1);
      props.setSelectItems((prev) => ({ ...prev, items: selected }));
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const items = finishedInventories.items;
      const remaining = items.filter((i) => i.status !== "success");
      setRemainingInventories((prev) => ({ ...prev, items: remaining }));

      if (items.length > 0 && !isBanned) {
        setIsApply(remaining.length === 0);
        setIsDisplayedButton(remaining.length > 0);
      }

      if (items.length === 0 && !isBanned) {
        setIsBanned(true);
        setIsLoading(true);

        let inv = props.selectItems.items;

        if (!inv || inv.length === 0) inv = props.loadedItems;

        inv = zeroingOutStatusAndErrorsItems(inv);

        setFinishedInventories((prev) => ({ ...prev, items: inv }));
        setIsLoading(false);
        setIsBanned(false);
      }
    }, 100 + penaltyDelay);

    return () => clearInterval(interval);
  });

  const errorHandler = async (action, actionCatch = async () => {}) => {
    try {
      await action();
    } catch (ex) {
      console.log(ex);
      await actionCatch();

      setErrorMessage(
        ex?.response?.status < 500 && ex?.response?.data?.error?.message
          ? ex.response.data.error.message
          : "Неизвестная ошибка"
      );
      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1000
      );
    }
  };

  return (
    <div className={styles.withdraw}>
      <div className={styles.withdraw_content}>
        <div className={styles.withdraw_header}>
          <div className={styles.loading}>
            <Loading isLoading={isLoading} click={() => {}} cursor="default" />
          </div>
          <div className={styles.tittle}>Вывод предметов</div>
        </div>
        {finishedInventories.items.length > 0 ? (
          <div className={styles.counter}>
            {finishedInventories.items.length -
              remainingInventories.items.length +
              "/" +
              finishedInventories.items.length}
          </div>
        ) : null}
        {errorMessage ? (
          <div className={styles.error}>{errorMessage}</div>
        ) : null}
        {isDisplayedButton ? (
          <div className={styles.button_withdraw} onClick={click}>
            Вывести
          </div>
        ) : null}
        {isApply ? (
          <div className={styles.description}>
            Все предметы отправлены :)
            <br />
            Для просмотра статуса, перейдите в выводы
          </div>
        ) : null}
        {finishedInventories.items.length > 0 ? (
          <div className={styles.delimiter_first}></div>
        ) : null}
        <div
          className={styles.items}
          style={
            finishedInventories.items.length > 3
              ? { overflowY: "scroll" }
              : { overflowY: "hidden" }
          }
        >
          {finishedInventories.items.map((i) => (
            <Item
              id={i.id}
              item={i.item}
              showItem={() => {
                if (i.status === "exchange") props.setExchangeItem(i);
              }}
              showStatus={true}
              status={i.status}
              error={i.error}
              key={i.id}
            />
          ))}
        </div>
        {finishedInventories.items.length > 0 ? (
          <div className={styles.delimiter_second}></div>
        ) : null}
      </div>
    </div>
  );
};

export default Withdraw;
