import { Notification } from "../services/notification";
import { Converter } from "./converter";

const error = async (
  action,
  actionCatch,
  setErrorMessage,
  penaltyDelay,
  setPenaltyDelay
) => {
  try {
    await action();
  } catch (ex) {
    console.log(ex);
    const utcDate = Converter.getUtcDate();
    const message =
      ex?.response?.status < 500 && ex?.response?.data?.error?.message
        ? ex.response.data.error.message
        : "Неизвестная ошибка";

    if ((!actionCatch || !(await actionCatch(ex))) && setErrorMessage) {
      setErrorMessage(message);
    }
    if (setPenaltyDelay && penaltyDelay) {
      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1000
      );
    }

    Notification.pushNotify({
      id: Converter.generateGuid(),
      tittle: "Ошибка",
      content: message,
      utcDate: utcDate,
      date: Converter.getMiniDate(utcDate),
      status: "error",
      code: ex?.response?.data?.error?.code || ex?.response?.status,
    });
  }
};

export const Handler = {
  error,
};
