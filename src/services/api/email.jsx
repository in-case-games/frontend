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

    async sendChangeLogin(password) {

    }

    async sendChangeEmail(password) {

    }

    async sendChangePassword(password) {
        const user = TokenService.getUser();

        const response = await api.put(
            EMAIL_API_URL + "authentication/sending/password/" + password, 
            {
                login: user.name,
                email: user.email
            });
            
        return response.data.data;
    }

    async sendDeleteAccount(password, token) {
        
    }

    async sendConfirmLogin(login, token) {

    }

    async sendConfirmEmail(email, token) {
        
    }

    async sendConfirmPassword(password, token) {
        const response = await api.get(
            EMAIL_API_URL + 
            "authentication/confirm/password/" + password + "?token=" + token);

        return response.data.data;
    }

    async sendConfirmDeleteAccount(password, token) {
        
    }

    async sendForgotPassword(data) {
        const response = await api.put(EMAIL_API_URL + "authentication/sending/forgot/password", data);

        return response.data.data;
    }
}

export default Email;