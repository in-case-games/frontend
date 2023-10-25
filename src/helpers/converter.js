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
    ("0" + d.getMinutes()).slice(-2);

  return d1;
};

const cutString = (string, length) =>
  string.length > length ? string.substring(0, length) + "..." : string;

const cutCost = (cost) => {
  let r = Math.round(cost);
  if (r >= 1000000) r = `${Math.round(r / 10) / 100000}M`;
  else if (r >= 1000) r = `${Math.round(r / 10) / 100}K`;

  return r;
};

export const Converter = {
  getMiniDate,
  cutString,
  cutCost,
};
