import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class User {
    async getRouletteOpenings() {
        const response = await api.get(RESOURCES_API_URL + "user/history/opening/roulette");

        return response.data.data;
    }
}

export default User;