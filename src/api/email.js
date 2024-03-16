import Constants from '../constants'
import TokenService from '../services/token'
import api from './api'

class Email {
	async confirmAccount(token) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL +
				'authentication/confirm/account?token=' +
				token
		)

		if (response.data.data.accessToken) TokenService.setUser(response.data.data)

		return response.data.data
	}

	async confirmLogin(login, token) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL +
				'authentication/confirm/login/' +
				login +
				'?token=' +
				token
		)

		return response.data.data
	}

	async confirmEmail(email, token) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL +
				'authentication/confirm/email/' +
				email +
				'?token=' +
				token
		)

		return response.data.data
	}

	async confirmPassword(password, token) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL +
				'authentication/confirm/password/' +
				password +
				'?token=' +
				token
		)

		return response.data.data
	}

	async confirmDeleteAccount(token) {
		const response = await api.delete(
			Constants.GATE_AWAY_API_URL +
				'authentication/confirm/account?token=' +
				token
		)

		return response.data.data
	}

	async sendChangeLogin(password) {
		const user = TokenService.getUser()

		const response = await api.put(
			Constants.GATE_AWAY_API_URL + 'authentication/sending/login/' + password,
			{
				login: user.login,
				email: user.email,
			}
		)

		return response.data.data
	}

	async sendChangeEmail(password) {
		const user = TokenService.getUser()

		const response = await api.put(
			Constants.GATE_AWAY_API_URL + 'authentication/sending/email/' + password,
			{
				login: user.login,
				email: user.email,
			}
		)

		return response.data.data
	}

	async sendChangePassword(password) {
		const user = TokenService.getUser()

		const response = await api.put(
			Constants.GATE_AWAY_API_URL +
				'authentication/sending/password/' +
				password,
			{
				login: user.login,
				email: user.email,
			}
		)

		return response.data.data
	}

	async sendForgotPassword(data) {
		const response = await api.put(
			Constants.GATE_AWAY_API_URL + 'authentication/sending/forgot/password',
			data
		)

		return response.data.data
	}

	async sendDeleteAccount(password) {
		const user = TokenService.getUser()

		const response = await api.delete(
			Constants.GATE_AWAY_API_URL +
				'authentication/sending/account/' +
				password,
			{
				data: {
					login: user.login,
					email: user.email,
				},
			}
		)

		return response.data.data
	}
}

export default Email
