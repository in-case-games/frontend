import TokenService from "../token"
import api from "./api"

const EMAIL_API_URL = "https://localhost:5000/api/";

class Email {
    async checkSignIn(token) {
        const response = await api.get(EMAIL_API_URL + "authentication/confirm/account?token=" + token);

        if (response.data.data.accessToken) {
            TokenService.setUser(response.data.data);
        }

        return response.data;
    }
}

export default Email;