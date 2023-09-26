import { Box as BoxImage } from '../../assets/images/additional'
import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/"

class Box {
    async getGroups(name) {
        const game = await api.get(RESOURCES_API_URL + `game/name/${name}`)
        const response = await api.get(RESOURCES_API_URL + `box/group/game/${game.data.data.id}`)

        return response.data.data
    }

    async getBox(id) {
        const response = await api.get(RESOURCES_API_URL + "box/id/" + id)

        return response.data.data
    }

    async pullBoxWithImage(box) {
        try {
            await api.get(`http://localhost:8080/loot-boxes/${box.id}/${box.id}.png`)
            box.image = `http://localhost:8080/loot-boxes/${box.id}/${box.id}.png`
        }
        catch (err) {
            box.image = BoxImage
        }

        return box
    }

    async getBoxesByHistory(history, startIndex = 0, endIndex = history.length) {
        const result = []

        for (let i = startIndex; i < endIndex; i++) {
            const data = await this.getBox(history[i].boxId)

            const temp = {
                id: history[i].id,
                date: history[i].date,
                box: {
                    id: data.id,
                    name: data.name,
                    cost: Math.ceil(data.cost),
                    isLocked: data.isLocked
                },
                item: history[i].itemId
            }

            result.push(temp)
        }

        return result
    }
}

export default Box