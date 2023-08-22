import { Key } from "../../assets/images/icon"
const games = [
		{
				id:1,
				text:"CSGO",
				link:"/game/csgo",
				icon:Key
		},
		{
				id:2,
				text:"Dota 2",
				link:"/game/dota2",
				icon:Key
		},
		{
				id:3,
				text:"Скоро",
				link:"/",
				icon:Key
		},
];

const infos = [
	{
			id:1,
			text:"FAQ",
			link:"/",
			icon:Key
	},
	{
			id:2,
			text:"Инфо",
			link:"/info",
			icon:Key
	}
]

const langs = [
	{
			id:1,
			text:"RU",
			link:"/",
			icon:Key
	},
	{
			id:2,
			text:"ENG",
			link:"/",
			icon:Key
	}
]

const Constants = {
		langs,
		infos,
		games
}

export default Constants;