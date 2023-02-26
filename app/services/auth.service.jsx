import TokenService from "./token.service";
import api from "./api";

const API_URL_AUTH = "https://localhost:7153/auth/api/Authentication/";

const signIn = (userDto, password, ip, platform) => {
	return api.post(API_URL_AUTH + 
		`sigin/${password}?ip=${ip}&platform=${platform}`, 
		userDto);
};

const singUp = (userDto, password) => {
	return api.post(API_URL_AUTH + 
		`singup/${password}`,
		userDto);
};

const refreshTokens = () => {
	let refreshToken = TokenService.getLocalRefreshToken();

	api.post(API_URL_AUTH + 
		`refresh/${refresh_token}`);
};

const logout = refresh_token => {
	TokenService.removeUser();
	return api.delete(API_URL_AUTH + 
		`logout/${refresh_token}`);
};

const logoutAll = () => {
	TokenService.removeUser();
	return api.delete(API_URL_AUTH + 
		"logout/all");
};

const getCurrentUser = () = {
	return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
	getCurrentUser,
	signIn,
	singUp,
	logout,
	logoutAll
};

export default AuthService;