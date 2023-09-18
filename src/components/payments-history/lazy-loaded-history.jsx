import History from './history'

const LazyLoadedHistory = async (props) => {
	let showTemp = []

	const primary = props.primaryPayments
	let loadedPayments = props.loadedPayments
	const page = props.page

	let startIndex = (page - 1) * 20
	let endIndex = startIndex + 20

	if (endIndex > primary.length) endIndex = primary.length
	if (startIndex > primary.length) startIndex = endIndex - 20 >= 0 ? endIndex - 20 : 0
	if (startIndex < 0) startIndex = 0

	let loaded = []

	if (primary.length >= endIndex && (props.isAllReload || startIndex > loadedPayments.length - 1)) {
		for (let i = startIndex; i < endIndex; i++) {
			const temp = primary[i]
			//TODO Parse can back money
			temp.isBackMoney = false
			loaded.push(primary[i])
		}
	}

	if (startIndex > loadedPayments.length - 1) loadedPayments = [...loadedPayments, ...loaded]
	else if (props.isAllReload && endIndex <= loadedPayments.length) {
		let i = 0

		for (let j = startIndex; j < endIndex; j++) {
			loadedPayments[j] = loaded[i]
			i++
		}
	}
	else Array.prototype.splice.apply(loadedPayments, [0, loaded.length].concat(loaded))

	try {
		for (let j = startIndex; j < endIndex; j++) {
			let i = loadedPayments[j]

			showTemp.push(<History
				id={i.id}
				invoiceId={i.invoiceId}
				date={i.date}
				currency={i.currency}
				amount={i.amount}
				isBackMoney={i.isBackMoney}
				key={i.id}
			/>)
		}

		props.setLoadedPayments(loadedPayments)
		props.setShowPayments(showTemp)
	}
	catch (err) {
		props.backAll()
	}
}

export default LazyLoadedHistory