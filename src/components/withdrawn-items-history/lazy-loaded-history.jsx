import { History } from '.'
import { Item as ItemApi } from '../../services/api'

const LazyLoadedHistory = async (props) => {
	const itemApi = new ItemApi()

	let showTemp = []

	const primary = props.primaryItems
	let loadedItems = props.loadedItems
	const page = props.page

	let startIndex = (page - 1) * 20
	let endIndex = startIndex + 20

	if (endIndex > primary.length) endIndex = primary.length
	if (startIndex > primary.length) startIndex = endIndex - 20 >= 0 ? endIndex - 20 : 0
	if (startIndex < 0) startIndex = 0

	let loaded = []

	if (primary.length >= endIndex && (props.isAllReload || startIndex > loadedItems.length - 1)) {
		loaded = await itemApi.getItemsByWithdrawnHistory(primary, startIndex, endIndex)
	}

	if (startIndex > loadedItems.length - 1) loadedItems = [...loadedItems, ...loaded]
	else if (props.isAllReload && endIndex <= loadedItems.length) {
		let i = 0

		for (let j = startIndex; j < endIndex; j++) {
			loadedItems[j] = loaded[i]
			i++
		}
	}
	else Array.prototype.splice.apply(loadedItems, [0, loaded.length].concat(loaded))

	try {
		for (let j = startIndex; j < endIndex; j++) {
			let i = loadedItems[j]

			showTemp.push(<History
				id={i.id}
				invoiceId={i.invoiceId}
				date={i.date}
				fixedCost={i.fixedCost}
				item={i.item}
				showItem={() => props.setItem(i.item)}
				marketId={i.marketId}
				status={i.status}
				key={i.id}
			/>)
		}

		props.setLoadedItems(loadedItems)
		props.setShowItems(showTemp)
	}
	catch (err) {
		props.backAll()
	}
}

export default LazyLoadedHistory