import React, { useEffect, useState } from 'react'
import { Item as ItemApi, User as UserApi } from '../../../../api'
import {
	InCoinGray as InCoin,
	KeyGray as Key,
} from '../../../../assets/images/icons'
import { Simple as Item } from '../../../../components/game-item'
import { Converter } from '../../../../helpers/converter'
import { Handler } from '../../../../helpers/handler'
import { Roulette as Group } from '../../../../layouts'
import styles from './roulette.module'

const Roulette = props => {
	const userApi = new UserApi()
	const itemApi = new ItemApi()

	const [hovered, setHovered] = useState(false)
	const [items, setItems] = useState()

	useEffect(() => {
		const interval = setInterval(() => {
			if (!items && props.box?.inventory) loadRandomParams(10)
		}, 100)
		return () => clearInterval(interval)
	})

	const clickOpenBox = async () => {
		if (!props.user) {
			console.log('Need sign in')
		} else if (!props.user?.balance || props.box?.cost > props.user?.balance) {
			props.setIsShowPayment(true)
		} else if (!props.box?.isLocked) {
			await Handler.error(async () => {
				let winItem = await userApi.openBox(props.box.id)
				const findItem = props.box.inventory.find(
					i => i.item.id === winItem.id
				)?.item
				const res = Object.assign(winItem, findItem || {})

				if (!winItem.image) winItem = await itemApi.pushImage(winItem)

				props.setWinItem(res)
				props.setIsRollingRoulette(true)

				loadRandomParams(res)
			})
		}
	}

	const getTextButton = () => {
		if (!props.user) return <div className={styles.text}>Войдите в аккаунт</div>
		if (!props.user.balance || props.box?.cost > props.user?.balance)
			return (
				<div className={styles.text}>
					Пополнить на{' '}
					{Converter.cutCost(props.box?.cost - props.user?.balance, v =>
						Math.ceil(v)
					)}
					<img className={styles.inCoin} alt='' src={InCoin} />
				</div>
			)

		return (
			<div className={styles.text}>
				<img className={styles.key} alt='' src={Key} />
				Открыть за {Converter.cutCost(props.box?.cost, v => Math.ceil(v))}
				<img className={styles.inCoin} alt='' src={InCoin} />
			</div>
		)
	}

	const getStyles = () => {
		const isOrange = props.user && !props.box?.isLocked

		return {
			cursor: isOrange ? 'pointer' : 'default',
			background: isOrange ? '#f8b415' : '#b8b8b8',
			padding: hovered ? '8px 30px' : '5px 10px',
		}
	}

	const loadRandomParams = winItem => {
		const target = Converter.getRandomInt(20, 60)
		const items = []

		for (let i = 0; i < target + 5; i++) {
			const num = Converter.getRandomInt(
				0,
				props.box.inventory.at(-1).chanceWining
			)
			const item =
				target === i && winItem && winItem.image
					? winItem
					: props.box.inventory.find(i => i.chanceWining >= num).item

			items.push(<Item id={item.id} item={item} key={item.id + i} />)
		}

		setItems(items)
	}

	return (
		<div className={styles.roulette}>
			{items ? (
				<Group
					isRolling={props.isRollingRoulette}
					setRollingEnd={() => props.setIsRollingRoulette(false)}
				>
					{items}
				</Group>
			) : null}
			{!props.isRollingRoulette ? (
				<div
					className={styles.button_open}
					style={getStyles()}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					onClick={clickOpenBox}
				>
					{getTextButton()}
				</div>
			) : null}
		</div>
	)
}

export default Roulette
