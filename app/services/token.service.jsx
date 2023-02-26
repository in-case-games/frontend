const getLocalRefreshToken = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user?.refreshToken;
};

const getLocalAccessToken = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
	let user = JSON.parse(localStorage.getItem("user"));
	user.accessToken = token;
	localStorage.setItem("user", JSON.stringify);
};

const setUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const removeUser = () => {
	localStorage.removeItem("user");
};

const TokenService = {
	getLocalRefreshToken,
	getLocalAccessToken,
	updateLocalAccessToken,
	setUser,
	getUser,
	removeUser
};

export default TokenService;