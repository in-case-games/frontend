import React, { useEffect, useState } from 'react'
import { User } from '../../services/api'
import { ItemWindow, LoadImageWindow, Modal } from '../modal'
import { CounterSlider } from '../slider'
import LazyLoadedHistory from './lazy-loaded-history'
import classes from "./openings-history.module.css"

const OpeningsHistory = (props) => {
	const [pages, setPages] = useState(1)
	const [page, setPage] = useState(1)

	const [primaryOpenings, setPrimaryOpenings] = useState([])
	const [loadedOpenings, setLoadedOpenings] = useState([])
	const [showOpenings, setShowOpenings] = useState(null)

	const [item, setItem] = useState(null)
	const [file, setFile] = useState()

	const [isClickSlider, setIsClickSlider] = useState(false)
	const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)

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
				const userApi = new User()

				async function loadOpenings(isAllReload) {
					let primary = primaryOpenings
					let pagesTemp = pages

					if (isAllReload) {
						primary = await userApi.getBoxOpenings()

						pagesTemp = Math.ceil(primary.length / 20)
						pagesTemp = pagesTemp === 0 ? 1 : pagesTemp

						setPrimaryOpenings(primary)
						setPages(pagesTemp)

						if (page > pagesTemp) setPage(pagesTemp)
					}

					LazyLoadedHistory({
						"isAllReload": isAllReload,
						"primaryOpenings": primary,
						"loadedOpenings": loadedOpenings,
						"page": page > pagesTemp ? pagesTemp : page,
						"setLoadedOpenings": setLoadedOpenings,
						"setShowOpenings": setShowOpenings,
						"setItem": setItem,
						"backAll": () => setPage(page - 1 < 1 ? 1 : page - 1)
					})
				}

				if (props.isLoading && isClickSlider) {
					loadOpenings(false)

					props.setIsLoading(false)
					setIsClickSlider(false)
				}
				else if (props.isLoading && !isClickSlider) {
					loadOpenings(true)

					props.setIsLoading(false)
				}
			}
			catch (err) { }
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.openings_history_content}>
			<div className={classes.openings_history}>
				{showOpenings}
			</div>
			<CounterSlider
				page={page}
				pages={pages}
				eventClick={sliderClick}
			/>
			<Modal
				active={item}
				clickChange={() => {
					setItem(null)
					setFile()
				}}
				content={
					<ItemWindow
						item={item}
						image={file}
						resetImage={() => setFile()}
						openLoadWindow={setIsOpenLoadWindow}
					/>
				}
			/>
			<Modal
				active={isOpenLoadWindow}
				clickChange={_ => setIsOpenLoadWindow(false)}
				content={
					<LoadImageWindow
						file={file}
						setFile={setFile}
						width={200}
						height={200}
						sizeMb={1}
						regular={/\.(png)$/}
						description={"PNG (MAX. 200x200px | 1MB)"}
					/>
				}
			/>
		</div>)
}

export default OpeningsHistory