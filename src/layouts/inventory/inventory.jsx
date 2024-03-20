import React, { useEffect, useState } from 'react'
import { Counter as Slider } from '../../components/common/sliders'
import { Handler } from '../../helpers/handler'
import styles from './inventory.module'
import LazyLoading from './lazy-loading'

const Inventory = props => {
	const quantityPerPage = props.quantityPerPage ? props.quantityPerPage : 20
	const [currentFilter, setCurrentFilter] = useState(props.filterName)

	const [isClickSlider, setIsClickSlider] = useState(false)

	const [primaryInventory, setPrimaryInventory] = useState([])
	const [loadedInventory, setLoadedInventory] = useState([])
	const [showInventory, setShowInventory] = useState(null)

	const [pages, setPages] = useState(1)
	const [page, setPage] = useState(1)

	const sliderClick = step => {
		const p = page + step
		const isAllowed = !props.isLoading && !isClickSlider

		if (p >= 1 && p <= pages && isAllowed) {
			setIsClickSlider(true)
			setPage(p)
			props.setIsLoading(true)
		}
	}

	useEffect(() => {
		const interval = setInterval(() => props.setIsLoading(true), 10000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			async function loadInventory(isAllReload) {
				let primary = primaryInventory
				let pages = pages

				if (isAllReload) primary = await props.loadPrimary()
				if (props.filter) primary = props.filter(primary)

				pages = Math.ceil(primary.length / quantityPerPage)
				pages = pages === 0 ? 1 : pages

				setPrimaryInventory(primary)
				setPages(pages)

				if (page > pages) setPage(pages)

				await LazyLoading({
					isAllReload: isAllReload,
					primary: primary,
					loaded: loadedInventory,
					page: page > pages ? pages : page,
					quantityPerPage: quantityPerPage,
					setLoaded: setLoadedInventory,
					setShow: setShowInventory,
					additionalLoading: props.additionalLoading,
					createShowByLoaded: props.createShowByLoaded,
					backAll: () => setPage(page <= 2 ? 1 : page - 1),
				})
			}

			if (props.isLoading) {
				await Handler.error(
					async () => {
						await loadInventory(!isClickSlider)
						props.setIsLoading(false)
						setIsClickSlider(false)
					},
					async () => {
						props.setIsLoading(false)
						setIsClickSlider(false)
						return false
					}
				)
			} else if (currentFilter !== props.filterName) {
				setCurrentFilter(props.filterName)
				setPage(1)
				setLoadedInventory([])

				props.setIsLoading(true)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.inventory}>
			<div className={styles.content}>{showInventory}</div>
			<div className={styles.slider}>
				<Slider page={page} pages={pages} click={sliderClick} />
			</div>
		</div>
	)
}

export default Inventory
