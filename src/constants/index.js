import {
  BrainBlack as Brain,
  KeyGray as Key,
  GunBlack as Gun,
  InfoBlack as Info,
  FaqBlack,
} from "../assets/images/icons";
import { GameCSGO as CSGO, GameDota2 as Dota2 } from "../assets/images/main";

const Games = [
  {
    id: 1,
    text: "CSGO",
    name: "csgo",
    link: "game/csgo",
    icon: Gun,
    image: CSGO,
    nameTrade: "Ссылка на обмен",
    urlTrade: "http://steamcommunity.com/my/tradeoffers/privacy",
    regexTrade:
      /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i,
  },
  {
    id: 2,
    text: "Dota 2",
    name: "dota2",
    link: "game/dota2",
    icon: Brain,
    image: Dota2,
    nameTrade: "Ссылка на обмен",
    urlTrade: "http://steamcommunity.com/my/tradeoffers/privacy",
    regexTrade:
      /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i,
  },
];

const TemplateItem = {
  game: "csgo",
  type: "none",
  rarity: "white",
  quality: "none",
};

const TemplateBox = {
  name: "Шаблончик",
  cost: 1,
  game: "csgo",
};

const Infos = [
  {
    id: 1,
    text: "FAQ",
    link: "",
    icon: FaqBlack,
  },
  {
    id: 2,
    text: "Инфо",
    link: "info",
    icon: Info,
  },
];

const Langs = [
  {
    id: 1,
    text: "RU",
    link: "",
    icon: Key,
  },
  {
    id: 2,
    text: "ENG",
    link: "",
    icon: Key,
  },
];

const generateGradient = (color, transparent = true) =>
  `linear-gradient(180deg, rgb(${
    transparent ? color + ", 0" : "26, 26, 29, 1"
  }) 0%, rgb(${color}, ${transparent ? 0.6 : 1}) 60%)`;

const ItemGradients = {
  blue: generateGradient("5, 0, 255"),
  gold: generateGradient("255, 199, 0"),
  red: generateGradient("255, 0, 0"),
  pink: generateGradient("173, 0, 255"),
  violet: generateGradient("255, 0, 199"),
  white: generateGradient("255, 255, 255"),
  green: generateGradient("0, 255, 30"),
  gray: generateGradient("211, 211, 211"),
  orange: generateGradient("254, 115, 36"),
};

const ItemGradientsNoTransparent = {
  blue: generateGradient("5, 0, 255", false),
  gold: generateGradient("255, 199, 0", false),
  red: generateGradient("255, 0, 0", false),
  pink: generateGradient("173, 0, 255", false),
  violet: generateGradient("255, 0, 199", false),
  white: generateGradient("255, 255, 255", false),
  green: generateGradient("0, 255, 30", false),
  gray: generateGradient("211, 211, 211", false),
  orange: generateGradient("254, 115, 36", false),
};

const ItemColors = {
  blue: "#0500FF",
  gold: "#FFC700",
  red: "#FF0000",
  pink: "#AD00FF",
  violet: "#FF00C7",
  white: "#FFFFFF",
  gray: "#d3d3d3",
  orange: "#fe7324",
  green: "#008000",
};

const StatusAndColor = {
  cancel: "red",
  wait: "gray",
  success: "green",
  exchange: "orange",
  loading: "green",
};

const WithdrawErrors = {
  4: "Внутренняя ошибка, повторите попытку позже",
  5: "Предмет с нестабильной ценой, нажмите для обмена",
  2: "Происходит перевод средств, повторите попытку позже",
};

const CommonTimeDelays = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 10 },
  { id: 8, name: 12 },
  { id: 9, name: 15 },
  { id: 10, name: 20 },
  { id: 11, name: 30 },
  { id: 12, name: 60 },
];
const CountDots = [
  { id: 1, name: 10 },
  { id: 2, name: 20 },
  { id: 3, name: 30 },
  { id: 4, name: 40 },
  { id: 5, name: 50 },
  { id: 6, name: 60 },
];
const CommonTypeTimeDelays = [
  { id: 1, name: "seconds" },
  { id: 60, name: "minutes" },
];

const Constants = {
  Langs,
  Infos,
  Games,
  ItemGradients,
  ItemGradientsNoTransparent,
  ItemColors,
  TemplateItem,
  TemplateBox,
  StatusAndColor,
  WithdrawErrors,
  CommonTimeDelays,
  CommonTypeTimeDelays,
  CountDots,
};

export default Constants;
