import api from "./api";
import TokenService from "../token";

class Authentication {
    async login(login, password) {
        console.log(login, password); 
        const response = await api
            .post("/authentication/signin", {
                id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
                login: login,
                email:login,
                password: password,
                ip:"string",
                platform: "string"
            });
        console.log(response); 
        if (response.data.accessToken) {
            TokenService.setUser(response.data);
        }
        return response.data;
    }

    logout() {
        TokenService.removeUser();
    }

    async register(login, email, password) {
        return await api.post("/auth/signup", {
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