import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { BoxGroup } from "../../../components"
import { Box as BoxApi } from '../../../services/api'

const BoxGroupLoader = (props) => {
	let { id } = useParams()
	const boxApi = new BoxApi()
	const [groups, setGroups] = useState([])
	const [isStartBoxGroup, setIsStartBoxGroup] = useState(true)
	const [startUrl, setStartUrl] = useState(window.location.href)

	useEffect(() => {
		const interval = setInterval(() => {
			if (startUrl !== window.location.href) {
				setStartUrl(window.location.href)
				setIsStartBoxGroup(true)
			}
		}, 100)
		return () => {
			clearInterval(interval)
		}
	})
	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const response = await boxApi.getGroups(id)

				let groups = {}

				for (let i = 0; i < response.length; i++) {
					if (groups[response[i].group.name] !== undefined) {
						let temp = groups[response[i].group.name]
						const box = await boxApi.pullBoxWithImage(response[i].box)
						temp.push(box)
						groups[response[i].group.name] = temp
					}
					else {
						let temp = []
						const box = await boxApi.pullBoxWithImage(response[i].box)
						temp.push(box)
						groups[response[i].group.name] = temp
					}
				}

				const keys = Object.keys(groups)
				setGroups(keys.map(key => <BoxGroup name={key} boxes={groups[key]} key={key} />))
			}
			catch (err) { }
			finally {
				setIsStartBoxGroup(false)
			}
		}, (isStartBoxGroup ? 100 : 30000))

		return () => clearInterval(interval)
	})

	return (groups.length > 0 ? <div>{groups}</div> : null)
}

export default BoxGroupLoader