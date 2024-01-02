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

    if (
      (!actionCatch || (actionCatch && !(await actionCatch(ex)))) &&
      setErrorMessage
    ) {
      setErrorMessage(
        ex?.response?.status < 500 && ex?.response?.data?.error?.message
          ? ex.response.data.error.message
          : "Неизвестная ошибка"
      );
    }
    if (setPenaltyDelay && penaltyDelay) {
      setPenaltyDelay(penaltyDelay + 1000);
      setTimeout(
        () =>
          setPenaltyDelay(penaltyDelay - 1000 <= 0 ? 0 : penaltyDelay - 1000),
        1000
      );
    }
  }
};

export const Handler = {
  error,
};
