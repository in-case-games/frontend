import api from "./api";
import TokenService from "../token";

const AUTH_API_URL = "https://localhost:7142/api";

class Authentication {
    async login(login, password) {
        return await api.post(AUTH_API_URL + "/authentication/signin", {
            id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
            login: login,
            email:login,
            password: password,
            ip:"string",
            platform: "string"
        });
    }

    logout() {
        TokenService.removeUser();
    }

    async register(login, email, password) {
        return await api.post(AUTH_API_URL + "/authentication/signup", {
            id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
            login: login,
            email: email,
            password: password,
            ip:"string",
            platform: "string"
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default Authentication;