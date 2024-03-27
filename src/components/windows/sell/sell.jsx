import React, { useEffect, useState } from 'react'
import { Item as ItemApi } from '../../../api'
import { Common } from '../../../helpers/common'
import { Handler } from '../../../helpers/handler'
import { Simple as Item } from '../../game-item'
import { LoadingArrow as Loading } from '../../loading'
import styles from './sell.module'

const Sell = props => {
	const itemApi = new ItemApi()

	const [isLoading, setIsLoading] = useState(true)
	const [isBanned, setIsBanned] = useState(false)
	const [isApply, setIsApply] = useState(false)
	const [isButton, setIsButton] = useState(false)

	const [finishedItems, setFinishedItems] = useState({ items: [] })
	const [remainingItems, setRemainingItems] = useState({ items: [] })

	useEffect(() => {
		const interval = setInterval(async () => {
			const finished = finishedItems.items
			const remaining = finished.filter(i => i.status !== 'success')

			if (remainingItems.items.length !== remaining.length) {
				setRemainingItems({ ...remainingItems, items: remaining })
			}
			if ((remaining.length === 0) !== isApply) {
				setIsApply(remaining.length === 0)
			}
			if (remaining.length > 0 !== isButton) {
				setIsButton(remaining.length > 0)
			}

			if (finished.length === 0 && !isBanned) {
				setIsBanned(true)
				setIsLoading(true)

				let selected = props.selectItems.items

				if (!selected || selected.length === 0) selected = props.loadedItems

				setFinishedItems({
					...finishedItems,
					items: Common.zeroingStatusesAndErrorsItems(selected),
				})
				setIsLoading(false)
				setIsBanned(false)
			}
		}, 10)

		return () => clearInterval(interval)
	})

	const selling = async () => {
		const finished = Common.zeroingStatusesAndErrorsItemsRealTime(
			finishedItems.items,
			setFinishedItems
		)

		for (let i = 0; i < finished.length; i++) {
			let error = false

			if (finished[i].status !== 'success') {
				finished[i].status = 'loading'
				setFinishedItems(prev => ({ ...prev, items: finished }))

				await Handler.error(
					async () => {
						await itemApi.sell(finished[i].id)
						finished[i].status = 'success'
					},
					async () => {
						error = true
						finished[i].status = 'cancel'
						finished[i].error = 'Внутренняя ошибка, попробуйте еще раз'
						return false
					}
				)

				setFinishedItems(prev => ({ ...prev, items: finished }))

				if (error) break
			}
		}

		setIsLoading(false)
		setIsBanned(false)
	}

	const click = () => {
		setIsBanned(true)
		setIsLoading(true)
		setIsButton(false)
		selling()
	}

	return (
		<div className={styles.sell}>
			<div className={styles.sell_content}>
				<div className={styles.sell_header}>
					<div className={styles.loading}>
						<Loading isLoading={isLoading} click={() => {}} cursor='default' />
					</div>
					<div className={styles.tittle}>Продажа предметов</div>
				</div>
				{finishedItems.items.length > 0 ? (
					<div className={styles.counter}>
						{finishedItems.items.length -
							remainingItems.items.length +
							'/' +
							finishedItems.items.length}
					</div>
				) : null}
				{isApply ? (
					<div className={styles.description}>Все предметы проданы :)</div>
				) : null}
				{isButton ? (
					<div className={styles.button_sell} onClick={click}>
						Продать
					</div>
				) : null}
				{finishedItems.items.length > 0 ? (
					<div className={styles.delimiter_first}></div>
				) : null}
				<div
					className={styles.items}
					style={
						finishedItems.items.length > 3
							? { overflowY: 'scroll' }
							: { overflowY: 'hidden' }
					}
				>
					{finishedItems.items.map(i => (
						<Item
							id={i.id}
							item={i.item}
							isLoading={isLoading}
							showStatus={true}
							status={i.status}
							error={i.error}
							key={i.id}
						/>
					))}
				</div>
				{finishedItems.items.length > 0 ? (
					<div className={styles.delimiter_second}></div>
				) : null}
			</div>
		</div>
	)
}

export default Sell
