import React, { useEffect, useState } from 'react'
import { Item as ItemApi } from '../../../api'
import Constants from '../../../constants'
import { Common } from '../../../helpers/common'
import { Handler } from '../../../helpers/handler'
import TradeUrlService from '../../../services/trade-url'
import { Simple as Item } from '../../game-item'
import { LoadingArrow as Loading } from '../../loading'
import styles from './withdraw.module'

const Withdraw = props => {
	const itemApi = new ItemApi()

	const [finishedItems, setFinishedItems] = useState({ items: [] })
	const [remainingItems, setRemainingItems] = useState({ items: [] })

	const [isLoading, setIsLoading] = useState(true)
	const [isApply, setIsApply] = useState(false)
	const [isBanned, setIsBanned] = useState(false)
	const [isButton, setIsButton] = useState(false)
	const [errorMessage, setErrorMessage] = useState()

	const isValidTradeUrls = () => {
		const checked = []
		let error = null

		for (let i = 0; i < remainingItems.items.length; i++) {
			const game = remainingItems?.items[i]?.item?.game

			if (checked.indexOf(game) === -1) {
				const isValid = TradeUrlService.IsValidTradeUrlByGame(game)
				checked.push(game)

				if (!isValid)
					error = error ?? 'Измените трейд ссылки в профиле: ' + game + '\n'
			}
		}

		setErrorMessage(error)

		return error === null
	}

	const click = () => {
		if (isValidTradeUrls()) {
			setIsButton(false)
			setIsBanned(true)
			setIsLoading(true)
			loader()
		}
	}

	const loader = async () => {
		const finished = Common.zeroingStatusesAndErrorsItemsRealTime(
			finishedItems.items,
			setFinishedItems
		)

		for (let i = 0; i < finished.length; i++) {
			const item = finished[i]
			let error = false

			if (item.status !== 'success') {
				finished[i].status = 'loading'
				setFinishedItems(prev => ({
					...prev,
					items: finished,
				}))
				await Handler.error(
					async () => {
						await itemApi.withdraw(
							item.id,
							TradeUrlService.GetUrlByGame[item.item.game]()
						)

						finished[i].status = 'success'
					},
					async err => {
						const code = err?.response?.data?.error?.code

						finished[i].status = 'cancel'
						finished[i].error =
							Constants.WithdrawErrors[code] === undefined
								? 'Подождите или напишите в тех. поддержку'
								: Constants.WithdrawErrors[code]

						if (code === 4) finished.push(finished[i])
						else if (code === 5) finished[i].status = 'exchange'
						else error = true

						return false
					},
					setErrorMessage
				)
				setFinishedItems(prev => ({
					...prev,
					items: finished,
				}))
				if (error) break
			}
		}
		setIsLoading(false)
		setIsBanned(false)
	}

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

				setFinishedItems(prev => ({
					...prev,
					items: Common.zeroingStatusesAndErrorsItems(selected),
				}))
				setIsLoading(false)
				setIsBanned(false)
			}
		}, 10)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.withdraw}>
			<div className={styles.withdraw_content}>
				<div className={styles.withdraw_header}>
					<div className={styles.loading}>
						<Loading isLoading={isLoading} click={() => {}} cursor='default' />
					</div>
					<div className={styles.tittle}>Вывод предметов</div>
				</div>
				{finishedItems.items.length > 0 ? (
					<div className={styles.counter}>
						{finishedItems.items.length -
							remainingItems.items.length +
							'/' +
							finishedItems.items.length}
					</div>
				) : null}
				{errorMessage ? (
					<div className={styles.error}>{errorMessage}</div>
				) : null}
				{isButton ? (
					<div className={styles.button_withdraw} onClick={click}>
						Вывести
					</div>
				) : null}
				{isApply ? (
					<div className={styles.description}>
						Все предметы отправлены :)
						<br />
						Для просмотра статуса, перейдите в выводы
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
							showItem={() => {
								if (i.status === 'exchange') props.setExchangeItem(i)
							}}
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

export default Withdraw
