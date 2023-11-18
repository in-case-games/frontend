import { CategoryScale, Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Converter } from "../helpers/converter";
import Constants from "../constants";

Chart.register(CategoryScale);
Chart.register(...registerables);

const renderCommonChart = (statistics) => {
  const labels = [];
  const users = [];
  const lootBoxes = [];
  const reviews = [];
  const withdrawnItems = [];
  const withdrawnFunds = [];
  const totalReplenishedFunds = [];
  const fundsUsersInventories = [];
  const returnedFunds = [];

  statistics.forEach((s) => {
    labels.push(s.date);
    users.push(s.users);
    lootBoxes.push(s.lootBoxes);
    reviews.push(s.reviews);
    withdrawnItems.push(s.withdrawnItems);
    withdrawnFunds.push(s.withdrawnFunds);
    totalReplenishedFunds.push(s.totalReplenishedFunds);
    fundsUsersInventories.push(s.fundsUsersInventories);
    returnedFunds.push(s.returnedFunds);
  });

  const chart = {
    labels: labels,
    datasets: [
      getBaseDataset("Users", users, "rgba(54, 162, 235, 0.5)"),
      getBaseDataset("Open boxes", lootBoxes, "red"),
      getBaseDataset("Reviews", reviews, "yellow"),
      getBaseDataset("Withdrawn Items", withdrawnItems, "green"),
      getBaseDataset("Withdrawn Funds", withdrawnItems, "blue"),
      getBaseDataset("Total Replenished Funds", totalReplenishedFunds, "brown"),
      getBaseDataset("FundsUsers Inventories", fundsUsersInventories, "gray"),
      getBaseDataset("Returned Funds", returnedFunds, "black"),
    ],
  };

  return <Line data={chart} />;
};

//todo date.start - date.max in per
const getChunkedStatistics = (
  statistics,
  delay = 1,
  typeDelay = "seconds",
  dots = 20
) => {
  const chunk =
    delay * Constants.CommonTypeTimeDelays.find((t) => t.name === typeDelay).id;

  const temp = JSON.parse(JSON.stringify(statistics.slice(chunk * -1 * dots)));

  const chunked = temp.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunk);

    if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  const result = [];

  for (var i = 0; i < chunked.length; i++) {
    const perArray = JSON.parse(JSON.stringify(chunked[i]));
    let per = perArray[0];
    const keys = Object.keys(per);

    for (var j = 1; j < perArray.length; j++) {
      per = sumObjectsByKey(per, perArray[j]);
    }

    const startDate = Converter.getMiniTime(chunked[i][0].date);
    const endDate = Converter.getMiniTime(
      chunked[i][chunked[i].length - 1].date
    );

    if (startDate !== endDate) per.date = startDate + " - " + endDate;
    else per.date = startDate;

    for (var j = 0; j < keys.length; j++) {
      if (keys[j] !== "date")
        per[keys[j]] = Math.round(per[keys[j]] / perArray.length);
    }

    result.push(per);
  }

  return result;
};

const sumObjectsByKey = (...objs) =>
  objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});

const getBaseDataset = (label, data, color) => ({
  label: label,
  data: data,
  backgroundColor: color,
  borderColor: color,
  borderWidth: 1,
});

const StatisticsService = {
  renderCommonChart,
  getChunkedStatistics,
};

export default StatisticsService;
