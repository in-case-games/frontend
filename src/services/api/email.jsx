import api from "./api";
import TokenService from "../token";

const EMAIL_API_URL = "https://localhost:7099/api";

class Email {
    async checkSignIn(token) {
        const response = await api.get(EMAIL_API_URL + "/email/confirm/account?token=" + token);

        if (response.data.data.accessToken) {
            TokenService.setUser(response.data.data);
        }

        return response.data;
    }
}

export default Email;