import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Item {
    async getItem(id) {
        const response = await api.get(RESOURCES_API_URL + "game/item/" + id);

        return response.data.data;
    }

		async getItemsByInventory(inventories) {
			const result = [];

			for(let i = 0; i < inventories.length; i++) {
					const response = await api.get(RESOURCES_API_URL + "game/item/id/" + inventories[i].itemId);
					const data = response.data.data;

					const temp = {
							id: inventories[i].id,
							date: inventories[i].date,
							cost: inventories[i].fixedCost,
							item: {
									id: data.id,
									img: `../data.id`,
									name: data.name,
									rarity: data.rarity,
									cost: Math.ceil(data.cost)
							}
					}

					result.push(temp);
			}

			return result;
		}

		async getItemsByHistory(history) {
			const result = [];

			for(let i = 0; i < history.length; i++) {
					const response = await api.get(RESOURCES_API_URL + "game/item/id/" + history[i].itemId);
					const data = response.data.data;

					const temp = {
							id: history[i].id,
							date: history[i].date,
							boxId: history[i].boxId,
							gameId: history[i].gameId,
							item: {
									id: history[i].itemId,
									img: `../history[i].boxId`,
									name: data.name,
									rarity: data.rarity,
									cost: Math.ceil(data.cost)
							}
					}

					result.push(temp);
			}

			return result;
	}
}

export default Item;