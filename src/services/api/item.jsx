import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Item {
		async withdrawItem(id, url) {
				const body = {
						"inventoryId": id,
						"tradeUrl": url
				} 
				const response = await api.post(RESOURCES_API_URL + `withdraw`, body);

				return response.data.data;
		}
		async exchangeItems(id, body) {
			const response = await api.put(
				RESOURCES_API_URL + `user/inventory/exchange`, 
				{
					inventoryId: id,
					items: body
				}
			);

			return response.data.data;
		}
		async sellItem(id) {
				const response = await api.get(RESOURCES_API_URL + `user/inventory/${id}/sell`);

				return response.data.data;
		}
    async getItem(id) {
        const response = await api.get(RESOURCES_API_URL + "game/item/id/" + id);

        return response.data.data;
    }

		async getItems() {
				const response = await api.get(RESOURCES_API_URL + "game/item");

				return response.data.data;
		}

		async getItemsByInventory(inventories, startIndex, endIndex) {
				const result = [];

				for(let i = startIndex; i < endIndex; i++) {
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
										cost: Math.ceil(data.cost),
										game: data.game 
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