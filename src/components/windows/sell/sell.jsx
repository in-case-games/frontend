import React, { useEffect, useState } from 'react'
import { Item as ItemApi } from '../../../api'
import { Handler } from '../../../helpers/handler'
import { Simple as Item } from '../../game-item'
import { LoadingArrow as Loading } from '../../loading'
import styles from './sell.module'

const Sell = props => {
	const itemApi = new ItemApi()

	const [isLoading, setIsLoading] = useState(true)
	const [isBanned, setIsBanned] = useState(false)
	const [isApply, setIsApply] = useState(false)
	const [isDisplayedButton, setIsDisplayedButton] = useState(false)

	const [finishedInventories, setFinishedInventories] = useState({ items: [] })
	const [remainingInventories, setRemainingInventories] = useState({
		items: [],
	})
	const [penaltyDelay, setPenaltyDelay] = useState(0)

	const click = () => {
		setIsBanned(true)
		setIsLoading(true)
		setIsDisplayedButton(false)
		selling()
	}

	const selling = async () => {
		const items = finishedInventories.items

		for (let i = 0; i < items.length; i++) {
			if (items[i].status !== 'success') {
				items[i].status = 'wait'
				items[i].error = null
				setFinishedInventories(prev => ({ ...prev, items: items }))
			}
		}

		for (let i = 0; i < items.length; i++) {
			const id = items[i].id
			const index = props.selectItems.items.indexOf(id)
			let error = false

			await Handler.error(
				async () => {
					if (items[i].status !== 'success') {
						items[i].status = 'loading'
						setFinishedInventories(prev => ({ ...prev, items: items }))

						await itemApi.sell(id)

						items[i].status = 'success'
						setFinishedInventories(prev => ({ ...prev, items: items }))
					}
				},
				async () => {
					error = true
					items[i].status = 'cancel'
					items[i].error = 'Внутренняя ошибка, попробуйте еще раз'
					setFinishedInventories(prev => ({ ...prev, items: items }))
					return false
				},
				undefined,
				penaltyDelay,
				setPenaltyDelay
			)

			removeSelectItem(index)

			if (error) break
		}

		setIsLoading(false)
		setIsBanned(false)
	}

	const removeSelectItem = index => {
		if (index > -1) {
			let items = props.selectItems.items
			items.splice(index, 1)
			props.setSelectItems({ ...props.selectItems, ...items })
		}
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			const items = finishedInventories.items
			const remaining = items.filter(i => i.status !== 'success')
			setRemainingInventories({ ...remainingInventories, items: remaining })

			if (items.length > 0 && !isBanned) {
				setIsApply(remaining.length === 0)
				setIsDisplayedButton(remaining.length > 0)
			}
		}, 100 + penaltyDelay)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (finishedInventories.items.length === 0 && !isBanned) {
				setIsBanned(true)
				setIsLoading(true)

				let inv = props.selectItems.items

				if (!inv || inv.length === 0) inv = props.loadedItems

				for (let i = 0; i < inv.length; i++) {
					inv[i].status = 'wait'
					inv[i].error = null
				}

				setFinishedInventories({ ...finishedInventories, items: inv })
				setIsLoading(false)
				setIsBanned(false)
			}
		}, 10 + penaltyDelay)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.sell}>
			<div className={styles.sell_content}>
				<div className={styles.sell_header}>
					<div className={styles.loading}>
						<Loading isLoading={isLoading} click={() => {}} cursor='default' />
					</div>
					<div className={styles.tittle}>Продажа предметов</div>
				</div>
				{finishedInventories.items.length > 0 ? (
					<div className={styles.counter}>
						{finishedInventories.items.length -
							remainingInventories.items.length +
							'/' +
							finishedInventories.items.length}
					</div>
				) : null}
				{isApply ? (
					<div className={styles.description}>Все предметы проданы :)</div>
				) : null}
				{isDisplayedButton ? (
					<div className={styles.button_sell} onClick={click}>
						Продать
					</div>
				) : null}
				{finishedInventories.items.length > 0 ? (
					<div className={styles.delimiter_first}></div>
				) : null}
				<div
					className={styles.items}
					style={
						finishedInventories.items.length > 3
							? { overflowY: 'scroll' }
							: { overflowY: 'hidden' }
					}
				>
					{finishedInventories.items.map(i => (
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
				{finishedInventories.items.length > 0 ? (
					<div className={styles.delimiter_second}></div>
				) : null}
			</div>
		</div>
	)
}

export default Sell
