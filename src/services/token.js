import { jwtDecode } from 'jwt-decode'
import { User as UserApi } from '../api'

const getUser = () => JSON.parse(localStorage.getItem('user'))
const removeUser = () => localStorage.removeItem('user')

const getAccessClaims = () => jwtDecode(getAccessToken())
const getRefreshClaims = () => jwtDecode(getRefreshToken())

const getAccessToken = () => JSON.parse(localStorage.getItem('user'))?.accessToken
const getRefreshToken = () => JSON.parse(localStorage.getItem('user'))?.refreshToken

const getExpiresAccessToken = () => JSON.parse(localStorage.getItem('user'))?.expiresAccess
const getExpiresRefreshToken = () => JSON.parse(localStorage.getItem('user'))?.expiresRefresh

const setUser = async user => {
	const userApi = new UserApi()
	const decodeAccess = jwtDecode(user.accessToken)

	user.email = jwtDecode(user.refreshToken)[
		'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
	]
	user.id =
		decodeAccess[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
		]
	user.role =
		decodeAccess['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
	user.login =
		decodeAccess['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
	user.image = await userApi.getImageByUserId(user.id)

	localStorage.setItem('user', JSON.stringify(user))
}

const updateAccessToken = token => {
	let user = JSON.parse(localStorage.getItem('user'))

	user.accessToken = token
	localStorage.setItem('user', JSON.stringify(user))
}

const TokenService = {
	getRefreshToken,
	getAccessToken,
	getExpiresAccessToken,
	getExpiresRefreshToken,
	getAccessClaims,
	getRefreshClaims,
	updateAccessToken,
	getUser,
	setUser,
	removeUser,
}

export default TokenService
