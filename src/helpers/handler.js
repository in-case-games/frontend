import { Notification } from "../services/notification";
import { Converter } from "./converter";

const error = async (
  action,
  actionCatch,
  setErrorMessage,
  penaltyDelay,
  setPenaltyDelay,
  sourceMethodName
) => {
  try {
    if (setPenaltyDelay !== undefined && penaltyDelay !== undefined) {
      setPenaltyDelay(penaltyDelay + 1000);
    }

    const response = await action();
    const utcDate = Converter.getUtcDate();

    if (response?.status === 200 && response?.data?.data) {
      Notification.pushNotify({
        id: Converter.generateGuid(),
        tittle: "Успех",
        content: response?.data?.data,
        utcDate: utcDate,
        date: Converter.getMiniDate(utcDate),
        status: "success",
        code: 200,
      });
    } else if (response) {
      Notification.pushNotify({
        id: Converter.generateGuid(),
        tittle: "Необработанный ответ",
        content: response?.data?.data || "Необработанный ответ",
        utcDate: utcDate,
        date: Converter.getMiniDate(utcDate),
        status: "info",
        code: response?.status,
      });
    }

    if (
      setPenaltyDelay !== undefined &&
      penaltyDelay !== undefined &&
      penaltyDelay > 0
    ) {
      setPenaltyDelay(penaltyDelay - 1000 < 0 ? 0 : penaltyDelay - 1000);
    }
  } catch (ex) {
    console.log(
      `${ex} - ${sourceMethodName} - ${setPenaltyDelay} - ${penaltyDelay}`
    );
    const utcDate = Converter.getUtcDate();
    const message = ex?.response?.data?.error?.message
      ? ex.response.data.error.message
      : "Неизвестная ошибка";

    if ((!actionCatch || !(await actionCatch(ex))) && setErrorMessage) {
      setErrorMessage(message);
    }

    if (setPenaltyDelay !== undefined && penaltyDelay !== undefined) {
      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1500
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
