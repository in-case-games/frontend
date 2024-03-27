import { TemplateItem as TemplateImage } from '../assets/images/main'
import Constants from '../constants'
import api from './api'

class Item {
	async get() {
		const response = await api.get(Constants.GATE_AWAY_API_URL + 'game/item')

		return response.data.data
	}

	async getById(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'game/item/id/' + id
		)

		return response.data.data
	}

	async getByName(name) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'game/item/name/' + name
		)

		return response.data.data
	}

	async getByGameId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `game/${id}/item`
		)

		return response.data.data
	}
	async getRarities() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `game/item/rarities`
		)

		return response.data.data
	}
	async getTypes() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `game/item/types`
		)

		return response.data.data
	}
	async getQualities() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `game/item/qualities`
		)

		return response.data.data
	}
	async exchangeInventoryForItems(inventoryId, items) {
		const temp = []

		items.forEach(i =>
			temp.push({
				itemId: i.id,
				count: i.count,
			})
		)

		const request = {
			inventoryId: inventoryId,
			items: temp,
		}

		const response = await api.put(
			Constants.GATE_AWAY_API_URL + `user/inventory/exchange`,
			request
		)

		return response.data.data
	}
	async withdraw(id, url) {
		const body = {
			inventoryId: id,
			tradeUrl: url,
		}
		const response = await api.post(
			Constants.GATE_AWAY_API_URL + `withdraw`,
			body
		)

		return response.data.data
	}
	async sell(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/inventory/${id}/sell`
		)

		return response.data.data
	}
	async sellLastByItemId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/inventory/last/sell/${id}`
		)

		return response.data.data
	}
	async post(item) {
		const response = await api.post(
			Constants.GATE_AWAY_API_URL + 'game/item',
			item
		)

		return response.data.data
	}

	async put(item) {
		const response = await api.put(
			Constants.GATE_AWAY_API_URL + 'game/item',
			item
		)

		return response.data.data
	}

	async delete(id) {
		const response = await api.delete(
			Constants.GATE_AWAY_API_URL + `game/item/${id}`
		)

		return response.data.data
	}

	async pushImage(item) {
		const gameId = item?.game?.id ?? item?.gameId

		if (!gameId) throw new Error('Передайте в предмет game id')

		const url =
			Constants.FILE_SERVER_URL +
			`game-items/${gameId}/${item.id}/${item.id}.png`

		try {
			await api.get(url)
			item.image = url
		} catch (err) {
			item.image = TemplateImage
		}

		return item
	}
}

export default Item
