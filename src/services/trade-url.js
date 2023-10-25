const template = {
  steam: "",
};

const GetUrlByGame = {
  csgo: () => GetUrls()?.steam,
  dota2: () => GetUrls()?.steam,
};

const UpdateUrlByGame = {
  csgo: (v) => wrapperUpdateUrls((u) => (u = { ...u, steam: v })),
  dota2: (v) => wrapperUpdateUrls((u) => (u = { ...u, steam: v })),
};

const GetUrls = () => JSON.parse(localStorage.getItem("trade-urls"));

const wrapperUpdateUrls = (action) => {
  let urls = GetUrls();

  urls = action(urls || template);

  localStorage.setItem("trade-urls", JSON.stringify(urls));
};

const TradeUrlService = {
  GetUrls,
  UpdateUrlByGame,
  GetUrlByGame,
};

export default TradeUrlService;
