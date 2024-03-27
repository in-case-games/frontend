import Constants from '../constants'
import TokenService from '../services/token'
import api from './api'

class Authentication {
	signUp = async (login, email, password) =>
		await api.post(Constants.GATE_AWAY_API_URL + 'authentication/sign-up', {
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			login: login,
			email: email,
			password: password,
		})

	signIn = async (login, password) =>
		await api.post(Constants.GATE_AWAY_API_URL + 'authentication/sign-in', {
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			login: login,
			email: login,
			password: password,
		})

	logout = () => TokenService.removeUser()
}

export default Authentication
