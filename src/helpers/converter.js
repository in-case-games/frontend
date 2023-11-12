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

export const Converter = {
  getMiniDate,
  cutString,
  cutCost,
  getUtcDate,
  getDateIso,
};
