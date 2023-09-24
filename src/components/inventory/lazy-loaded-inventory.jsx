import React from 'react'
import { Item as ItemApi } from '../../services/api'
import InventoryItem from "../item/inventory-item"

const LazyLoadedInventory = async (props) => {
	const itemApi = new ItemApi()
	let showTemp = []

	const primary = props.primaryInventory
	let loadedInventory = props.loadedInventory
	const page = props.page

	let startIndex = (page - 1) * 20
	let endIndex = startIndex + 20

	if (endIndex > primary.length) endIndex = primary.length
	if (startIndex > primary.length) startIndex = endIndex - 20 >= 0 ? endIndex - 20 : 0
	if (startIndex < 0) startIndex = 0

	let loaded = []

	if (primary.length >= endIndex && (props.isAllReload || startIndex > loadedInventory.length - 1)) {
		loaded = await itemApi.getItemsByInventory(primary, startIndex, endIndex)

		for (let i = 0; i < loaded.length; i++) {
			loaded[i].item = await itemApi.pullItemWithImage(loaded[i].item)
		}
	}

	if (startIndex > loadedInventory.length - 1) loadedInventory = [...loadedInventory, ...loaded]
	else if (props.isAllReload && endIndex <= loadedInventory.length) {
		let i = 0

		for (let j = startIndex; j < endIndex; j++) {
			loadedInventory[j] = loaded[i]
			i++
		}
	}
	else Array.prototype.splice.apply(loadedInventory, [0, loaded.length].concat(loaded))

	try {
		for (let j = startIndex; j < endIndex; j++) {
			let i = loadedInventory[j]

			showTemp.push(<InventoryItem
				img={i.item.img}
				name={i.item.name}
				color={i.item.rarity}
				date={i.date}
				cost={i.cost}
				id={i.id}
				selectItems={props.item.selectItems}
				setSelectItems={props.item.setSelectItems}
				sellClick={props.item.sellClick}
				withdrawClick={props.item.withdrawClick}
				key={i.id}
			/>)
		}

		props.setLoadedInventory(loadedInventory)
		props.setShowInventory(showTemp)
	}
	catch (err) {
		props.backAll()
	}
}

export default LazyLoadedInventory