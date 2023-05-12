import api from "./api";

const RESOURCES_API_URL = "https://localhost:7102/api";

class User {
    async getLast100Openings() {
        const response = await api.get(RESOURCES_API_URL + "/user/history/openings/100");

        return response.data.data;
    }
}

export default User;