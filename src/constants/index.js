import { KeyGray as Key } from "../assets/images/icons";
import {
  GameCSGO as CSGO,
  GameDota2 as Dota2,
  TemplateSoon as Soon,
} from "../assets/images/main";

const Games = [
  {
    id: 1,
    text: "CSGO",
    name: "csgo",
    link: "game/csgo",
    icon: Key,
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
    icon: Key,
    image: Dota2,
    nameTrade: "Ссылка на обмен",
    urlTrade: "http://steamcommunity.com/my/tradeoffers/privacy",
    regexTrade:
      /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i,
  },
  {
    id: 3,
    text: "Скоро",
    link: "",
    icon: Key,
    image: Soon,
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
    icon: Key,
  },
  {
    id: 2,
    text: "Инфо",
    link: "info",
    icon: Key,
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

function generateGradient(color) {
  return `linear-gradient(180deg, rgb(${color}, 0) 0%, rgb(${color}, 0.6) 60%)`;
}

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

const Constants = {
  Langs,
  Infos,
  Games,
  ItemGradients,
  ItemColors,
  TemplateItem,
  TemplateBox,
  StatusAndColor,
  WithdrawErrors,
};

export default Constants;
