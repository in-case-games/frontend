import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
	baseURL: "https://localhost:7153/auth/api/Authentication/",
	headers: {
		"Content-Type" : "application/json",
	}
});

instance.interceptors.request.use(
	(config) => {
		const token = TokenService.getLocalAccessToken();

		if(token) {
			config.headers["Authorization"] = "Bearer" + token;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},

	async(error) => {
		const originalConfig = error.config;

		if(originalConfig.url !== "singin" && 
			originalConfig.url !== "signup" && 
			error.response) {
			if(error.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					const response = await instance.post("refresh_token", {
						refreshToken: TokenService.getLocalRefreshToken()
					});

					TokenService.setUser(response.data.data);

					return instance(originalConfig);
				} catch(_error) {
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(error);
	}
);

export default instance;