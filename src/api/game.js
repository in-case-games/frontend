import Constants from '../constants'
import api from './api'

class Game {
	async getByName(name) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `game/name/${name}`
		)

		return response.data.data
	}
	async get() {
		const response = await api.get(Constants.GATE_AWAY_API_URL + 'game')

		return response.data.data
	}
}

export default Game
