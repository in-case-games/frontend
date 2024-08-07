import { bake_cookie } from 'sfcookies'
import { TemplateUser } from '../assets/images/main'
import Constants from '../constants'
import TokenService from '../services/token'
import api from './api'

class User {
	async getById(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/id/${id}`
		)

		return response.data.data
	}
	async get() {
		const response = await api.get(Constants.GATE_AWAY_API_URL + 'user')

		return response.data.data
	}
	async refreshTokens() {
		const rs = await api.get(
			Constants.GATE_AWAY_API_URL +
				'authentication/refresh?token=' +
				TokenService.getRefreshToken()
		)
		return rs
	}
	async getByLogin(login) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/login/${login}`
		)

		return response.data.data
	}
	async getInventoryById(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/inventory/id/${id}`
		)

		return response.data.data
	}
	async getInventory() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'user/inventory'
		)

		return response.data.data
	}
	async getInventoryByUserId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/${id}/inventory`
		)

		return response.data.data
	}
	async getBalance() {
		const response = await api.get(Constants.GATE_AWAY_API_URL + 'user/balance')
		const balance = response.data.data.balance

		bake_cookie('user-balance', balance)

		return balance
	}
	async getRoles() {
		const response = await api.get(Constants.GATE_AWAY_API_URL + `user/role`)

		return response.data.data
	}
	async getPromocodes() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/promo-code`
		)

		return response.data.data
	}
	async getReviewLast(count) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'user/review/last/' + count
		)

		return response.data.data
	}

	async getRouletteOpenings() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'user/history/opening/roulette'
		)

		return response.data.data
	}
	async getRouletteOpeningsByBoxId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/history/opening/roulette/box/${id}`
		)

		return response.data.data
	}
	async getOpeningsByUserId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/${id}/history/opening`
		)

		return response.data.data
	}
	async getOpenings() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'user/history/opening'
		)

		return response.data.data
	}
	async getPayments() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'user/history/payment'
		)

		return response.data.data
	}
	async getWithdrawn100Last() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + 'user/history/withdraw'
		)

		return response.data.data
	}
	async transferWithdrawn(id) {
		return await api.get(
			Constants.GATE_AWAY_API_URL + `user/history/withdraw/${id}/transfer`
		)
	}

	async openBox(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/opening/box/${id}`
		)

		return response.data.data
	}

	async getRestrictions() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/restriction`
		)

		return response.data.data
	}

	async getRestrictionsByUserId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/${id}/restriction`
		)

		return response.data.data
	}

	async getRestrictionsByOwner() {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/restriction/owner`
		)

		return response.data.data
	}

	async getPathBannerByBoxId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/path/banner/box/${id}`
		)

		return response.data.data
	}

	async getRestrictionsByOwnerId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/restriction/owner/${id}`
		)

		return response.data.data
	}

	async getBalanceByUserId(id) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/${id}/balance`
		)

		return response.data.data.balance
	}

	async getImage() {
		const user = TokenService.getUser()
		try {
			try {
				await api.get(
					Constants.FILE_SERVER_URL + `users/${user.id}/${user.id}.jpg`
				)
				return Constants.FILE_SERVER_URL + `users/${user.id}/${user.id}.jpg`
			} catch (err) {
				try {
					await api.get(
						Constants.FILE_SERVER_URL + `users/${user.id}/${user.id}.jpeg`
					)
					return Constants.FILE_SERVER_URL + `users/${user.id}/${user.id}.jpeg`
				} catch (err) {
					await api.get(
						Constants.FILE_SERVER_URL + `users/${user.id}/${user.id}.png`
					)
					return Constants.FILE_SERVER_URL + `users/${user.id}/${user.id}.png`
				}
			}
		} catch (err) {
			return TemplateUser
		}
	}

	async getImageByUserId(id) {
		try {
			try {
				await api.get(Constants.FILE_SERVER_URL + `users/${id}/${id}.jpg`)
				return Constants.FILE_SERVER_URL + `users/${id}/${id}.jpg`
			} catch (err) {
				try {
					await api.get(Constants.FILE_SERVER_URL + `users/${id}/${id}.jpeg`)
					return Constants.FILE_SERVER_URL + `users/${id}/${id}.jpeg`
				} catch (err) {
					await api.get(Constants.FILE_SERVER_URL + `users/${id}/${id}.png`)
					return Constants.FILE_SERVER_URL + `users/${id}/${id}.png`
				}
			}
		} catch (err) {
			return TemplateUser
		}
	}

	async updateImage(image) {
		const body = {
			image: image,
		}
		const response = await api.put(
			Constants.GATE_AWAY_API_URL + `user/info/image`,
			body
		)

		return response.data.data
	}

	async updateImageByAdmin(userId, image) {
		const body = {
			userId: userId,
			image: image,
		}
		const response = await api.put(
			Constants.GATE_AWAY_API_URL + `admin/info/image`,
			body
		)

		return response.data.data
	}

	async updateEmailByAdmin(userId, email) {
		return await api.get(
			Constants.GATE_AWAY_API_URL +
				`authentication/confirm/${userId}/email/${email}`
		)
	}

	async updateLoginByAdmin(userId, login) {
		return await api.get(
			Constants.GATE_AWAY_API_URL +
				`authentication/confirm/${userId}/login/${login}`
		)
	}

	async updateRoleByAdmin(userId, roleId) {
		return await api.get(
			Constants.GATE_AWAY_API_URL + `user/${userId}/info/role/${roleId}`
		)
	}

	async updateBalanceByAdmin(userId, balance) {
		return await api.get(
			Constants.GATE_AWAY_API_URL + `user/${userId}/balance/${balance}/owner`
		)
	}

	async deleteUserInventoryByAdmin(id) {
		const response = await api.delete(
			Constants.GATE_AWAY_API_URL + `user/inventory/${id}`
		)

		return response.data.data
	}

	async activatePromocode(name) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/promo-code/activate/${name}`
		)

		return response.data.data
	}

	async postPathBanner(data) {
		const response = await api.post(
			Constants.GATE_AWAY_API_URL + `user/path/banner`,
			data
		)

		return response.data.data
	}

	async putPathBanner(data) {
		const response = await api.put(
			Constants.GATE_AWAY_API_URL + `user/path/banner`,
			data
		)

		return response.data.data
	}

	async deletePathBannerById(id) {
		const response = await api.delete(
			Constants.GATE_AWAY_API_URL + `user/path/banner/${id}`
		)

		return response.data.data
	}

	async exchangePromocode(name) {
		const response = await api.get(
			Constants.GATE_AWAY_API_URL + `user/promo-code/exchange/${name}`
		)

		return response.data.data
	}
}

export default User
