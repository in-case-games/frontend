import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class BoxGroup {
    async getGroups(name) {
        const game = await api.get(RESOURCES_API_URL + `game/name/${name}`);
        const response = await api.get(RESOURCES_API_URL + `box/group/game/${game.data.data.id}`);

        return response.data.data;
    }
}

export default BoxGroup;