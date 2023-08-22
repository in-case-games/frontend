import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Game {
    async getGamesByName(name) {
        const response = await api.get(RESOURCES_API_URL + `game/name/${name}`);

        return response.data.data;
    }
    async getGames() {
        const response = await api.get(RESOURCES_API_URL + "game");

        return response.data.data;
    }
}

export default Game;