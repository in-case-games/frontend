import React from 'react'
import { Box as BoxApi } from '../../services/api'
import LootBox from '../loot-box/loot-box'

const LazyLoadedBoxes = async (props) => {
	const boxApi = new BoxApi()

	let showTemp = []

	const primary = props.primaryBoxes
	let loadedBoxes = props.loadedBoxes
	const page = props.page

	let startIndex = (page - 1) * 20
	let endIndex = startIndex + 20

	if (endIndex > primary.length) endIndex = primary.length
	if (startIndex > primary.length) startIndex = endIndex - 20 >= 0 ? endIndex - 20 : 0
	if (startIndex < 0) startIndex = 0

	let loaded = []

	if (primary.length >= endIndex && (props.isAllReload || startIndex > loadedBoxes.length - 1)) {
		for (let i = startIndex; i < endIndex; i++)
			loaded.push(await boxApi.pullBoxWithImage(primary[i]))
	}

	if (startIndex > loadedBoxes.length - 1) loadedBoxes = [...loadedBoxes, ...loaded]
	else if (props.isAllReload && endIndex <= loadedBoxes.length) {
		let i = 0

		for (let j = startIndex; j < endIndex; j++) {
			loadedBoxes[j] = loaded[i]
			i++
		}
	}
	else Array.prototype.splice.apply(loadedBoxes, [0, loaded.length].concat(loaded))

	try {
		for (let j = startIndex; j < endIndex; j++) {
			let i = loadedBoxes[j]

			showTemp.push(<LootBox
				box={i}
				showBox={(box) => props.setBox(box)}
				key={i.id}
			/>)
		}

		props.setLoadedBoxes(loadedBoxes)
		props.setShowBoxes(showTemp)
	}
	catch (err) {
		props.backAll()
	}
}

export default LazyLoadedBoxes