import React, { useEffect, useState } from 'react'
import { LazyLoadedBoxes } from '.'
import { Box } from '../../services/api'
import { CounterSlider } from '../slider'
import classes from "./admin-boxes.module.css"

const AdminBoxes = (props) => {
	const [pages, setPages] = useState(1)
	const [page, setPage] = useState(1)

	const [primaryBoxes, setPrimaryBoxes] = useState([])
	const [loadedBoxes, setLoadedBoxes] = useState([])
	const [showBoxes, setShowBoxes] = useState(null)

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
				const boxApi = new Box()

				async function loadBoxes(isAllReload) {
					let primary = primaryBoxes
					let pagesTemp = pages

					if (isAllReload) {
						primary = await boxApi.getBoxesByGame(props.getFilterGame().id)

						pagesTemp = Math.ceil(primary.length / 20)
						pagesTemp = pagesTemp === 0 ? 1 : pagesTemp

						setPrimaryBoxes(primary)
						setPages(pagesTemp)

						if (page > pagesTemp) setPage(pagesTemp)
					}

					const primaryTemp = []
					const filterName = props.getFilterName()

					for (let i = 0; i < primary.length; i++) {
						const box = primary[i]
						const name = box.name.toLowerCase()

						if (name.startsWith(filterName.toLowerCase())) primaryTemp.push(box)
					}

					LazyLoadedBoxes({
						"isAllReload": isAllReload,
						"primaryBoxes": primaryTemp,
						"loadedBoxes": loadedBoxes,
						"page": page > pagesTemp ? pagesTemp : page,
						"setLoadedBoxes": setLoadedBoxes,
						"setShowBoxes": setShowBoxes,
						"setBox": props.setBox,
						"backAll": () => setPage(page - 1 < 1 ? 1 : page - 1)
					})
				}

				if (props.isLoading && isClickSlider) {
					loadBoxes(false)

					props.setIsLoading(false)
					setIsClickSlider(false)
				}
				else if (props.isLoading && !isClickSlider) {
					loadBoxes(true)

					props.setIsLoading(false)
				}
			}
			catch (err) { }
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.admin_boxes_content}>
			<div className={classes.admin_boxes}>
				{showBoxes}
			</div>
			<CounterSlider
				page={page}
				pages={pages}
				eventClick={sliderClick}
			/>
		</div>)
}

export default AdminBoxes