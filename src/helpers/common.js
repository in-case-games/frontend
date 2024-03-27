const zeroingStatusesAndErrorsItems = items => {
	for (let i = 0; i < items.length; i++) {
		items[i].status = 'wait'
		items[i].error = null
	}

	return items
}

const zeroingStatusesAndErrorsItemsRealTime = (items, setItems) => {
	for (let i = 0; i < items.length; i++) {
		if (items[i].status !== 'success') {
			items[i].status = 'wait'
			items[i].error = null
			setItems(prev => ({ ...prev, items: items }))
		}
	}

	return items
}

export const Common = {
	zeroingStatusesAndErrorsItems,
	zeroingStatusesAndErrorsItemsRealTime,
}
