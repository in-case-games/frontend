import Constants from '../constants'
import api from './api'

class Promocode {
	async get() {
		const response = await api.get(Constants.GATE_AWAY_API_URL + `promo-code`)

		return response.data.data
	}
	async post(promo) {
		const response = await api.post(
			Constants.GATE_AWAY_API_URL + `promo-code`,
			promo
		)

		return response.data.data
	}
	async put(promo) {
		const response = await api.put(
			Constants.GATE_AWAY_API_URL + `promo-code`,
			promo
		)

		return response.data.data
	}
	async delete(id) {
		const response = await api.delete(
			Constants.GATE_AWAY_API_URL + `promo-code/${id}`
		)

		return response.data.data
	}
	async getByName(name) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `promo-code/name/${name}`
		)

		return response.data.data
	}
	async getTypes() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `promo-code/types`
		)

		return response.data.data
	}
}

export default Promocode
