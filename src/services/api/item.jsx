import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Item {
    async getItem(id) {
        const response = await api.get(RESOURCES_API_URL + "game/item/" + id);

        return response.data.data;
    }

		async getItemsByHistory(history) {
			const result = [];

			for(let i = 0; i < history.length; i++) {
					const response = await api.get(RESOURCES_API_URL + "game/item/" + history[i].itemId);
					const data = response.data.data;

					const temp = {
							id: history.id,
							date: history.date,
							boxId: history.boxId,
							gameId: history.gameId,
							item: {
									name: data.name,
									rarity: data.rarity,
									cost: data.cost
							}
					}

					result.push(temp);
			}

			return result;
	}
}

export default Item;