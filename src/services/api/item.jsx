import { Item as ItemImage } from '../../assets/images/additional'
import api from "./api"
import Game from './game'

const RESOURCES_API_URL = "https://localhost:5000/api/"

class Item {
	async withdrawItem(id, url) {
		const body = {
			"inventoryId": id,
			"tradeUrl": url
		}
		const response = await api.post(RESOURCES_API_URL + `withdraw`, body)

		return response.data.data
	}
	async exchangeItems(id, body) {
		const temp = []

		body.forEach(e => temp.push({
			itemId: e.id,
			count: e.count
		}))

		const response = await api.put(
			RESOURCES_API_URL + `user/inventory/exchange`,
			{
				inventoryId: id,
				items: temp
			}
		)

		return response.data.data
	}
	async sellItem(id) {
		const response = await api.get(RESOURCES_API_URL + `user/inventory/${id}/sell`)

		return response.data.data
	}
	async getRarities() {
		const response = await api.get(RESOURCES_API_URL + `game/item/rarities`)

		return response.data.data
	}
	async getTypes() {
		const response = await api.get(RESOURCES_API_URL + `game/item/types`)

		return response.data.data
	}
	async getQualities() {
		const response = await api.get(RESOURCES_API_URL + `game/item/qualities`)

		return response.data.data
	}
	async getItem(id) {
		const response = await api.get(RESOURCES_API_URL + "game/item/id/" + id)

		return response.data.data
	}

	async getItems() {
		const response = await api.get(RESOURCES_API_URL + "game/item")

		return response.data.data
	}

	async pullItemWithImage(item) {
		const gameApi = new Game()
		const game = await gameApi.getGamesByName(item.game)

		try {
			await api.get(`http://localhost:8080/game-items/${game.id}/${item.id}/${item.id}.png`)
			item.image = `http://localhost:8080/game-items/${game.id}/${item.id}/${item.id}.png`
		}
		catch (err) {
			item.image = ItemImage
		}

		return item
	}

	async pullItemsWithImages(items, startIndex, endIndex) {
		const result = []
		const dictionary = {}

		const gameApi = new Game()
		const games = await gameApi.getGames()

		games.forEach(g => dictionary[g.name] = g.id)

		for (let i = startIndex; i < endIndex; i++) {
			const item = items[i]
			const gameId = dictionary[item.game]

			try {
				await api.get(`http://localhost:8080/game-items/${gameId}/${item.id}/${item.id}.png`)
				item.image = `http://localhost:8080/game-items/${gameId}/${item.id}/${item.id}.png`
			}
			catch (err) {
				item.image = ItemImage
			}

			result.push(item)
		}

		return result
	}

	async getItemsByWithdrawnHistory(history, startIndex = 0, endIndex = history.length) {
		const result = []

		for (let i = startIndex; i < endIndex; i++) {
			const response = await api.get(RESOURCES_API_URL + "game/item/id/" + history[i].itemId)
			const item = response.data.data

			item.cost = Math.ceil(item.cost)

			const temp = {
				id: history[i].id,
				date: history[i].date,
				fixedCost: history[i].fixedCost,
				invoiceId: history[i].invoiceId,
				status: history[i].status,
				marketId: history[i].marketId,
				item: item
			}

			result.push(temp)
		}

		return result
	}

	async getItemsByHistory(history, startIndex = 0, endIndex = history.length) {
		const result = []

		for (let i = startIndex; i < endIndex; i++) {
			const response = await api.get(RESOURCES_API_URL + "game/item/id/" + history[i].itemId)
			const item = response.data.data

			item.cost = Math.ceil(item.cost)

			const temp = {
				id: history[i].id,
				date: history[i].date,
				boxId: history[i].boxId,
				item: item
			}

			result.push(temp)
		}

		return result
	}

	async getItemsByInventory(inventories, startIndex, endIndex) {
		const result = []

		for (let i = startIndex; i < endIndex; i++) {
			const response = await api.get(RESOURCES_API_URL + "game/item/id/" + inventories[i].itemId)
			const item = response.data.data

			item.cost = Math.ceil(item.cost)

			const temp = {
				id: inventories[i].id,
				date: inventories[i].date,
				cost: inventories[i].fixedCost,
				item: item
			}

			result.push(temp)
		}

		return result
	}

	async createItem(item) {
		const response = await api.post(RESOURCES_API_URL + "game/item", item)

		return response.data.data
	}

	async updateItem(item) {
		const response = await api.put(RESOURCES_API_URL + "game/item", item)

		return response.data.data
	}

	async deleteItem(id) {
		const response = await api.delete(RESOURCES_API_URL + `game/item/${id}`)

		return response.data.data
	}
}

export default Item