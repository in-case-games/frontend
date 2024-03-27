import axios from 'axios'
import Constants from '../constants'
import TokenService from '../services/token'

const instance = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use(
	config => {
		const token = TokenService.getAccessToken()

		if (token) config.headers['Authorization'] = 'Bearer ' + token

		return config
	},
	error => Promise.reject(error)
)

instance.interceptors.response.use(
	res => res,
	async err => {
		const originalConfig = err.config
		if (
			err.response &&
			(err.response.status === 401 || err.response.data.code === '1') &&
			!originalConfig._retry
		) {
			originalConfig._retry = true

			try {
				const rs = await instance.get(
					Constants.GATE_AWAY_API_URL +
						'authentication/refresh?token=' +
						TokenService.getRefreshToken()
				)

				if (rs.status === 401 || rs.data.code === '1') TokenService.removeUser()
				else if (rs.status === 200) await TokenService.setUser(rs.data.data)

				return instance(originalConfig)
			} catch (error) {
				TokenService.removeUser()
				return Promise.reject(error)
			}
		}

		return Promise.reject(err)
	}
)

export default instance
