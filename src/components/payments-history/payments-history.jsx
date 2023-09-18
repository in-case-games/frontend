import React, { useEffect, useState } from 'react'
import { User } from '../../services/api'
import { CounterSlider } from '../slider'
import LazyLoadedHistory from './lazy-loaded-history'
import classes from "./payments-history.module.css"

const PaymentsHistory = (props) => {
	const [pages, setPages] = useState(1)
	const [page, setPage] = useState(1)

	const [primaryPayments, setPrimaryPayments] = useState([])
	const [loadedPayments, setLoadedPayments] = useState([])
	const [showPayments, setShowPayments] = useState(null)

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
				const userApi = new User()

				async function loadPayments(isAllReload) {
					let primary = primaryPayments
					let pagesTemp = pages

					if (isAllReload) {
						primary = await userApi.getPayments()

						//TODO Remove string bot one ONE one

						primary = [{
							id: "96666d82-73d9-40ca-a2ea-82f6b4b2e77a",
							invoiceId: "",
							date: "2023-09-16T07:42:07.410081Z",
							currency: "RUB",
							amount: 162,
						}]

						pagesTemp = Math.ceil(primary.length / 20)
						pagesTemp = pagesTemp === 0 ? 1 : pagesTemp

						setPrimaryPayments(primary)
						setPages(pagesTemp)

						if (page > pagesTemp) setPage(pagesTemp)
					}

					LazyLoadedHistory({
						"isAllReload": isAllReload,
						"primaryPayments": primary,
						"loadedPayments": loadedPayments,
						"page": page > pagesTemp ? pagesTemp : page,
						"setLoadedPayments": setLoadedPayments,
						"setShowPayments": setShowPayments,
						"backAll": () => setPage(page - 1 < 1 ? 1 : page - 1)
					})
				}

				if (props.isLoading && isClickSlider) {
					loadPayments(false)

					props.setIsLoading(false)
					setIsClickSlider(false)
				}
				else if (props.isLoading && !isClickSlider) {
					loadPayments(true)

					props.setIsLoading(false)
				}
			}
			catch (err) { }
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.payments_history_content}>
			<div className={classes.payments_history}>
				{showPayments}
			</div>
			<CounterSlider
				page={page}
				pages={pages}
				eventClick={sliderClick}
			/>
		</div>
	)
}

export default PaymentsHistory