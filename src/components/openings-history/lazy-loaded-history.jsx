import React from 'react'
import { Box as BoxApi, Item as ItemApi } from '../../services/api'
import History from './history'

const LazyLoadedHistory = async (props) => {
	const itemApi = new ItemApi()
	const boxApi = new BoxApi()

	let showTemp = []

	const primary = props.primaryOpenings
	let loadedOpenings = props.loadedOpenings
	const page = props.page

	let startIndex = (page - 1) * 20
	let endIndex = startIndex + 20

	if (endIndex > primary.length) endIndex = primary.length
	if (startIndex > primary.length) startIndex = endIndex - 20 >= 0 ? endIndex - 20 : 0
	if (startIndex < 0) startIndex = 0

	let loaded = []

	if (primary.length >= endIndex && (props.isAllReload || startIndex > loadedOpenings.length - 1)) {
		const tempItems = await itemApi.getItemsByHistory(primary, startIndex, endIndex)
		const tempBoxes = await boxApi.getBoxesByHistory(primary, startIndex, endIndex)

		for (let i = 0; i < tempItems.length; i++) {
			loaded.push({
				id: tempItems[i].id,
				date: tempItems[i].date,
				item: tempItems[i].item,
				box: tempBoxes[i].box
			})
		}
	}

	if (startIndex > loadedOpenings.length - 1) loadedOpenings = [...loadedOpenings, ...loaded]
	else if (props.isAllReload && endIndex <= loadedOpenings.length) {
		let i = 0

		for (let j = startIndex; j < endIndex; j++) {
			loadedOpenings[j] = loaded[i]
			i++
		}
	}
	else Array.prototype.splice.apply(loadedOpenings, [0, loaded.length].concat(loaded))

	try {
		for (let j = startIndex; j < endIndex; j++) {
			let i = loadedOpenings[j]

			showTemp.push(<History
				id={i.id}
				item={i.item}
				box={i.box}
				date={i.date}
				key={i.id}
			/>)
		}

		props.setLoadedOpenings(loadedOpenings)
		props.setShowOpenings(showTemp)
	}
	catch (err) {
		props.backAll()
	}
}

export default LazyLoadedHistory