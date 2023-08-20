import axios from "axios"
import TokenService from "../token"

const AUTH_API_URL = "https://localhost:5000/api/";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) { 
      if ((err.response.status === 401 || err.response.data.error.code === "1") && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.get(AUTH_API_URL + "authentication/refresh?refreshToken=" + TokenService.getRefreshToken());

          const { accessToken } = rs.data;
          TokenService.updateAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;