import React, { useEffect, useState } from 'react'
import { LazyLoadedItems } from '.'
import { Item } from '../../services/api'
import { CounterSlider } from '../slider'
import classes from "./admin-items.module.css"

const AdminItems = (props) => {
	const [pages, setPages] = useState(1)
	const [page, setPage] = useState(1)

	const [primaryItems, setPrimaryItems] = useState([])
	const [loadedItems, setLoadedItems] = useState([])
	const [showItems, setShowItems] = useState(null)

	const [isClickSlider, setIsClickSlider] = useState(false)

	const sliderClick = (number) => {
		if (props.isLoading === false && isClickSlider === false) {
			setIsClickSlider(true)

			if (number < 0) setPage(page + number > 1 ? page + number : 1)
			else setPage(page + number < pages ? page + number : pages)

			props.setIsLoading(true)
		}
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			if (!props.isLoading) props.setIsLoading(true)
		}, 10000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const itemApi = new Item()

				async function loadItems(isAllReload) {
					let primary = primaryItems
					let pagesTemp = pages

					if (isAllReload) {
						primary = await itemApi.getItemsByGame(props.getFilterGame().id)

						pagesTemp = Math.ceil(primary.length / 20)
						pagesTemp = pagesTemp === 0 ? 1 : pagesTemp

						setPrimaryItems(primary)
						setPages(pagesTemp)

						if (page > pagesTemp) setPage(pagesTemp)
					}

					const primaryTemp = []
					const filterName = props.getFilterName()

					for (let i = 0; i < primary.length; i++) {
						const item = primary[i]
						const name = item.name.toLowerCase()

						if (name.startsWith(filterName.toLowerCase())) primaryTemp.push(item)
					}

					LazyLoadedItems({
						"isAllReload": isAllReload,
						"primaryItems": primaryTemp,
						"loadedItems": loadedItems,
						"page": page > pagesTemp ? pagesTemp : page,
						"setLoadedItems": setLoadedItems,
						"setShowItems": setShowItems,
						"setItem": props.setItem,
						"backAll": () => setPage(page - 1 < 1 ? 1 : page - 1)
					})
				}

				if (props.isLoading && isClickSlider) {
					loadItems(false)

					props.setIsLoading(false)
					setIsClickSlider(false)
				}
				else if (props.isLoading && !isClickSlider) {
					loadItems(true)

					props.setIsLoading(false)
				}
			}
			catch (err) { }
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.admin_items_content}>
			<div className={classes.admin_items}>
				{showItems}
			</div>
			<CounterSlider
				page={page}
				pages={pages}
				eventClick={sliderClick}
			/>
		</div>)
}

export default AdminItems