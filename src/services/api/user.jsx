import { bake_cookie } from 'sfcookies'
import { UserLogo } from '../../assets/images/additional'
import TokenService from '../token'
import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/"

class User {
    async getInventoriesByIds(ids) {
        const result = []

        for (let i = 0; i < ids.length; i++) {
            const response = await api.get(RESOURCES_API_URL + `user/inventory/id/${ids[i]}`)
            result.push(response.data.data)
        }

        return result
    }
    async getUserById(id) {
        const response = await api.get(RESOURCES_API_URL + `user/id/${id}`)

        return response.data.data
    }
    async getInventory() {
        const response = await api.get(RESOURCES_API_URL + "user/inventory")

        return response.data.data
    }
    async getBalance() {
        const response = await api.get(RESOURCES_API_URL + "user/balance")
        const balance = response.data.data.balance

        bake_cookie("user-balance", balance)

        return balance
    }
    async get() {
        const response = await api.get(RESOURCES_API_URL + "user")
        const user = response.data.data

        return user
    }
    async getRouletteOpenings() {
        const response = await api.get(RESOURCES_API_URL + "user/history/opening/roulette")

        return response.data.data
    }
    async getRouletteOpeningsByBoxId(id) {
        const response = await api.get(RESOURCES_API_URL + `user/history/opening/box/${id}`)

        return response.data.data
    }
    async getBoxOpenings() {
        const response = await api.get(RESOURCES_API_URL + "user/history/opening")

        return response.data.data
    }
    async getPayments() {
        const response = await api.get(RESOURCES_API_URL + "user/history/payment")

        return response.data.data
    }
    async getWithdrawnItems100Last() {
        const response = await api.get(RESOURCES_API_URL + "user/history/withdraw/100/last")

        return response.data.data
    }
    async transferWithdrawnItemInInventory(id) {
        const response = await api.get(RESOURCES_API_URL + `user/history/withdraw/${id}/transfer`)

        return response.data.data
    }
    async updateImage(image) {
        const body = {
            image: image
        }
        const response = await api.put(RESOURCES_API_URL + `user/info/image`, body)

        return response.data.data
    }
    async getImage() {
        const user = TokenService.getUser()
        try {
            await api.get(`http://localhost:8080/users/${user.id}/${user.id}.png`)
            return `http://localhost:8080/users/${user.id}/${user.id}.png`
        }
        catch (err) {
            return UserLogo
        }
    }

    async getRestrictions() {
        const response = await api.get(RESOURCES_API_URL + `user/restriction`)

        return response.data.data
    }

    async getRestrictionsByOwner() {
        const response = await api.get(RESOURCES_API_URL + `user/restriction/owner`)
        console.log(response)
        return response.data.data
    }

    async getImageById(id) {
        try {
            await api.get(`http://localhost:8080/users/${id}/${id}.png`)
            return `http://localhost:8080/users/${id}/${id}.png`
        }
        catch (err) {
            return UserLogo
        }
    }
}

export default User