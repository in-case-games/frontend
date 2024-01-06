const getMiniDate = (date) => {
  if (date === null) return "Без даты";

  var d = new Date(date);
  var d1 =
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    d.getFullYear() +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2);

  return d1;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

const getMiniTime = (date) => {
  if (date === null) return "Без даты";

  var d = new Date(date);
  var d1 =
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2);

  return d1;
};

const getUtcDate = () => {
  var date = new Date();

  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return now_utc;
};

const getDateIso = (date) => date.slice(0, 16);

const cutString = (string, length) =>
  string.length > length ? string.substring(0, length) + "..." : string;

const cutCost = (cost, rounding = (c) => Math.round(c)) => {
  let r = rounding(cost);
  if (r >= 1000000 || r <= -1000000) r = `${rounding(r / 10) / 100000}M`;
  else if (r >= 1000 || r <= -1000) r = `${rounding(r / 10) / 100}K`;

  return r;
};

const generateGuid = () =>
  "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

export const Converter = {
  getMiniDate,
  getMiniTime,
  cutString,
  cutCost,
  getUtcDate,
  getDateIso,
  getRandomInt,
  generateGuid,
};
