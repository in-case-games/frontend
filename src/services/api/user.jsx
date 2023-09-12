import { bake_cookie } from 'sfcookies'
import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class User {
    async getInventoriesByIds(ids) {
        const result = [];

        for(let i = 0; i < ids.length; i++) {
            const response = await api.get(RESOURCES_API_URL + `user/inventory/${ids[i]}`);
            result.push(response.data.data);
        }

        return result;
    }
    async getInventory() {
        const response = await api.get(RESOURCES_API_URL + "user/inventory");

        return response.data.data;
    }
    async getBalance() {
        const response = await api.get(RESOURCES_API_URL + "user/balance");
        const balance = response.data.data.balance

        bake_cookie("user-balance", balance);

        return balance;
    }
    async get() {
        const response = await api.get(RESOURCES_API_URL + "user");
        const user = response.data.data;
        
        return user;
    }
    async getRouletteOpenings() {
        const response = await api.get(RESOURCES_API_URL + "user/history/opening/roulette");

        return response.data.data;
    }
}

export default User;