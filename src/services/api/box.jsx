import api from "./api"

const RESOURCES_API_URL = "https://localhost:5000/api/"

class Box {
    async getGroups(name) {
        const game = await api.get(RESOURCES_API_URL + `game/name/${name}`)
        const response = await api.get(RESOURCES_API_URL + `box/group/game/${game.data.data.id}`)

        return response.data.data
    }

    async getBoxesByHistory(history, startIndex = 0, endIndex = history.length) {
        const result = []

        for (let i = startIndex; i < endIndex; i++) {
            const response = await api.get(RESOURCES_API_URL + "box/id/" + history[i].boxId)
            const data = response.data.data

            const temp = {
                id: history[i].id,
                date: history[i].date,
                box: {
                    id: data.id,
                    img: `../data.id`,
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