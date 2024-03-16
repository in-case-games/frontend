import { Handler } from '../../helpers/handler'

const LazyLoading = async props => {
	let loaded = props.loaded
	let additional = []
	let quantityPerPage = props.quantityPerPage ? props.quantityPerPage : 20

	let start = (props.page - 1) * quantityPerPage
	let end = start + quantityPerPage

	if (end > props.primary.length) end = props.primary.length
	if (start > props.primary.length)
		start = end >= quantityPerPage ? end - quantityPerPage : 0
	if (start < 0) start = 0

	if (props.isAllReload || start > loaded.length - 1)
		additional = await props.additionalLoading(props.primary, start, end)

	if (start > loaded.length - 1) loaded = [...loaded, ...additional]
	else if (props.isAllReload && end <= loaded.length) {
		let i = 0

		for (let j = start; j < end; j++) {
			loaded[j] = additional[i]
			i++
		}
	} else
		Array.prototype.splice.apply(
			loaded,
			[0, additional.length].concat(additional)
		)

	await Handler.error(
		async () => {
			const show = props.createShowByLoaded(loaded, start, end)

			props.setLoaded(loaded)
			props.setShow(show)
		},
		async () => {
			props.backAll()
			return false
		}
	)
}

export default LazyLoading
