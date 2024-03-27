import Constants from '../constants'
import api from './api'

class Site {
	async getStatistics() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'site/statistics'
		)
		return response.data.data
	}
	async getAdminStatistics() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'admin/site/statistics'
		)
		return response.data.data
	}
}

export default Site
