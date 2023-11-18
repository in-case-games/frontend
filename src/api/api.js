import axios from "axios";
import TokenService from "../services/token";

const AUTH_API_URL = "https://localhost:5000/api/";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token !== undefined) {
      config.headers["Authorization"] = "Bearer " + token;
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
      if (
        (err.response.status === 401 || err.response.data.code === "1") &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const rs = await instance.get(
            AUTH_API_URL +
              "authentication/refresh?token=" +
              TokenService.getRefreshToken()
          );

          if (rs.status === 401 || rs.data.code === "1") {
            TokenService.removeUser();
          } else if (rs.status === 200) {
            await TokenService.setUser(rs.data.data);
          }

          return instance(originalConfig);
        } catch (_error) {
          TokenService.removeUser();
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
