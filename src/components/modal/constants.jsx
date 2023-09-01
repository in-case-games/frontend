import { read_cookie } from 'sfcookies'

const Regex = {
	"csgo": /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i,
	"dota2": /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i
}

const Cookie = {
	"csgo": () => read_cookie("user-steam-url"),
	"dota2": () => read_cookie("user-steam-url")
}

const isRegexCookie = (game) => {
	const regex = Regex[game];
	const cookie = Cookie[game]();

	return regex.test(cookie);
};

const Constants = {
	Regex, Cookie, isRegexCookie
};

export default Constants;