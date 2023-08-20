import TokenService from "../token"
import api from "./api"

const AUTH_API_URL = "https://localhost:5000/api/";

class Authentication {
    async login(login, password) {
        return await api.post(AUTH_API_URL + "authentication/sign-in", {
            id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
            login: login,
            email: login,
            password: password
        });
    }

    logout() {
        TokenService.removeUser();
    }

    async register(login, email, password) {
        return await api.post(AUTH_API_URL + "authentication/sign-up", {
            id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
            login: login,
            email: email,
            password: password
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default Authentication;