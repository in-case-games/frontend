const Regex = {
	"csgo": /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i,
	"dota2": /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i
}

const TradeURL = {
	"csgo": () => JSON.parse(localStorage.getItem("trade-urls"))?.steam,
	"dota2": () => JSON.parse(localStorage.getItem("trade-urls"))?.steam
}

const UpdateTradeURL = {
	"csgo": (value) => updateTradeURL((tradeURLs) => tradeURLs.steam = value),
	"dota2": (value) => updateTradeURL((tradeURLs) => tradeURLs.steam = value),
}

const CheckUndefinedNull = (value, replacement) => (value === undefined || value === null) ? replacement : value;

const updateTradeURL = (updateUrl) => {
		let tradeURLs = JSON.parse(localStorage.getItem("trade-urls"));

		const pattern = {
			steam: ""
		};

		if(tradeURLs === undefined || tradeURLs === null) tradeURLs = pattern;

		tradeURLs = updateUrl(tradeURLs);

		localStorage.setItem("trade-urls", JSON.stringify(pattern));
};

const IsRegexTradeURL = (game) => {
	const regex = Regex[game];
	const url = TradeURL[game]();

	return regex.test(url);
};

const Constants = {
	Regex, TradeURL, IsRegexTradeURL, UpdateTradeURL, CheckUndefinedNull
};

export default Constants;