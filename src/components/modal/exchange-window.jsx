import React, { useEffect, useState } from 'react'
import { GunWhite, InCoinWhite } from '../../assets/images/icon'
import { Item } from '../../services/api'
import ExchangeItem from '../item/exchange-item'
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const ExchangeWindow = (props) => {
	const [isLoading, setIsLoading] = useState(true)
	const [clickItem, setClickItem] = useState(false)
	const [bannedRefresh, setBannedRefresh] = useState(false)

	const [allowedCost, setAllowedCost] = useState(Math.floor(props.inventory.cost))
	const [filter, setFilter] = useState("")

	const [exchangeItems, setExchangeItems] = useState({ items: [] })
	const [primaryItems, setPrimaryItems] = useState([])
	const [showItems, setShowItems] = useState([])

	const changeClick = async () => {
		if (allowedCost >= 0) {
			const itemApi = new Item()

			const index = props.selectItems.items.indexOf(props.inventory.id)

			removeSelectItem(index)

			if (exchangeItems.items.length === 0) await itemApi.sellItem(props.inventory.id)
			else await itemApi.exchangeItems(props.inventory.id, exchangeItems.items)

			props.closeWindow()
		}
	}

	const removeSelectItem = (index) => {
		if (props.selectItem === props.inventory.id) props.setSelectItem(null)
		else if (index > -1) {
			let tempSelectItems = props.selectItems.items
			tempSelectItems.splice(index, 1)
			props.setSelectItems({ ...props.selectItems, ...tempSelectItems })
		}
	}

	const inputFilter = (value) => {
		if (!isLoading && !bannedRefresh && !clickItem) {
			const show = []
			const ids = []

			exchangeItems.items.forEach(i => ids.push(i.id))

			if (value === "") {
				for (let i = 0; i < primaryItems.length; i++) {
					const item = primaryItems[i]

					if (item.cost <= allowedCost || ids.indexOf(item.id) > -1) show.push(item)
				}
			}
			else {
				for (let i = 0; i < primaryItems.length; i++) {
					const item = primaryItems[i]
					const name = item.name.toLowerCase()

					if (name.startsWith(value.toLowerCase())) show.push(item)
				}
			}

			setFilter(value)
			setShowItems(show)
		}
	}

	const changeCost = (cost, rounding = (c) => Math.floor(c)) => {
		let temp = rounding(cost)

		if (temp >= 1000000 || temp <= -1000000) temp = `${rounding(temp / 10) / 100000}M`
		else if (temp >= 1000 || temp <= -1000) temp = `${rounding(temp / 10) / 100}K`

		return temp
	}

	const getCountItems = () => {
		let count = 0

		exchangeItems.items.forEach(i => count += i.count)

		return count
	}

	useEffect(() => {
		const interval = setInterval(async () => setIsLoading(true), 5000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			const updateShowItem = async (isAllReload) => {
				setBannedRefresh(true)
				const itemApi = new Item()

				let primary = primaryItems

				if (isAllReload) {
					primary = await itemApi.getItems()
					setPrimaryItems(primary)
				}

				const ids = []
				const show = []

				let cost = props.inventory.cost

				exchangeItems.items.forEach(i => {
					cost -= i.cost * i.count
					ids.push(i.id)
				})

				if (filter === "") {
					for (let i = 0; i < primary.length; i++) {
						const item = await itemApi.pullItemWithImage(primary[i])

						if (item.cost <= cost || ids.indexOf(item.id) > -1) show.push(item)
					}
				}
				else {
					for (let i = 0; i < primary.length; i++) {
						const item = await itemApi.pullItemWithImage(primary[i])
						const name = item.name.toLowerCase()

						if (name.startsWith(filter.toLowerCase())) show.push(item)
					}
				}

				setAllowedCost(cost)
				setShowItems(show)
			}
			if (isLoading && !bannedRefresh) {
				updateShowItem(true)

				setIsLoading(false)
				setBannedRefresh(false)
			}
			else if (!isLoading && !bannedRefresh && clickItem) {
				updateShowItem(false)

				setClickItem(false)
				setBannedRefresh(false)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.exchange_window}>
			<div className={classes.exchange_content}>
				<div className={classes.exchange_tittle}>
					<Loading isLoading={isLoading} click={() => { }} cursor="default" />
					<div className={classes.tittle}>Обмен предметов</div>
				</div>
				<div className={classes.btn_main} onClick={() => changeClick()}>Обменять</div>
				<div className={classes.delimiter}></div>
				<input
					maxLength={50}
					className={classes.input_form}
					placeholder="Название предмета"
					value={filter}
					onInput={e => inputFilter(e.target.value)}
					name="name-item"
				/>
				{
					showItems.length > 0 ?
						<div className={classes.items} style={showItems.length > 3 ? { overflowY: "scroll" } : { overflowY: 'hidden' }}>
							{showItems.map(i => <ExchangeItem
								key={i.id}
								item={i}
								allowedCost={allowedCost}
								selectItems={exchangeItems}
								setSelectItems={setExchangeItems}
								clickItem={clickItem}
								setClickItem={setClickItem} />)}
						</div> : <div className={classes.not_found}>Предметы не найдены</div>
				}
				<div className={classes.delimiter}></div>
				<div className={classes.exchange_counters}>
					<div className={classes.counter} style={{ background: "green" }}>
						<div className={classes.counter_title}>
							{10 - getCountItems()}
						</div>
						<img src={GunWhite} alt="" />
					</div>
					{
						<div className={classes.counter} style={{ background: allowedCost >= 0 ? "green" : "red" }}>
							<div className={classes.counter_title}>
								{allowedCost >= 0 ? "+" : ""}{changeCost(allowedCost)}
							</div>
							<img src={InCoinWhite} alt="" />
						</div>
					}
				</div>
			</div>
		</div>)
}

export default ExchangeWindow