import React, { useState } from 'react'
import {
	Game as GameApi,
	Item as ItemApi,
	User as UserApi,
} from '../../../../api'
import {
	AirplaneBlack as Airplane,
	CartBlack as Cart,
} from '../../../../assets/images/icons'
import { ComboBox } from '../../../../components/common/inputs'
import { Simple as Item } from '../../../../components/game-item'
import { LoadingArrow as Loading } from '../../../../components/loading'
import {
	Exchange as ExchangeWindow,
	Inventory as InventoryWindow,
	Item as ItemWindow,
	LoadImage as LoadImageWindow,
	Sell as SellWindow,
	Withdraw as WithdrawWindow,
} from '../../../../components/windows'
import {
	Inventory as InventoryLayout,
	Modal as ModalLayout,
} from '../../../../layouts'
import styles from './content.module'

const Inventory = () => {
	const userApi = new UserApi()
	const itemApi = new ItemApi()
	const gameApi = new GameApi()

	const [isLoading, setIsLoading] = useState(true)
	const [isOpenSellWindow, setIsOpenSellWindow] = useState(false)
	const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)
	const [isOpenWithdrawWindow, setIsOpenWithdrawWindow] = useState(false)

	const [games, setGames] = useState()
	const [user, setUser] = useState()
	const [item, setItem] = useState()
	const [exchangeItem, setExchangeItem] = useState()
	const [image, setImage] = useState()
	const [inventory, setInventory] = useState()

	const [selectItems, setSelectItems] = useState({ items: [] })
	const [loadedItems, setLoadedItems] = useState([])
	const [filterName, setFilterName] = useState('без фильтра')
	const [filterIndex, setFilterIndex] = useState('simple')

	const additionalLoading = async (array, start, end) => {
		let loaded = []
		const g = games || (await loadedGames())
		const u = user || (await loadedUser())

		for (let i = start; i < end; i++) {
			let inv = array[i]
			let item = await itemApi.getById(inv.itemId)
			item.gameId = g[item.game]
			item = await itemApi.pushImage(item)
			inv.item = item
			inv.user = u
			loaded.push(inv)
		}

		setLoadedItems(loaded)

		return loaded
	}

	const createShowByLoaded = (array, start, end) => {
		let result = []

		for (let j = start; j < end; j++) {
			const inv = array[j]
			const item = inv.item
			item.cost = inv.fixedCost

			result.push(
				<Item
					id={inv.id}
					item={inv.item}
					showInfo={() => setInventory(inv)}
					select={() => {
						const selected = selectItems?.items
						const index = selected.findIndex(s => s.id === inv.id)

						if (index === -1 && selected.length < 20) {
							selected.push(inv)
							setSelectItems({ ...selectItems, selected })
						} else if (index !== -1) {
							selected.splice(index, 1)
							setSelectItems({ ...selectItems, selected })
						}
					}}
					selectItems={selectItems}
					key={inv.id}
				/>
			)
		}

		return result
	}

	const loadedUser = async () => {
		const user = await userApi.get()
		user.image = await userApi.getImage()

		setUser(user)

		return user
	}

	const loadedGames = async () => {
		const games = {}
		const response = await gameApi.get()

		for (let i = 0; i < response.length; i++) {
			games[response[i].name] = response[i].id
		}

		setGames(games)

		return games
	}

	const filtersForName = [
		{
			id: 'simple',
			name: 'без фильтра',
		},
		{
			id: 'price_top',
			name: 'возрастание цены',
		},
		{ id: 'price_bot', name: 'убывание цены' },
		{ id: 'date_top', name: 'возрастание даты' },
		{ id: 'date_bot', name: 'убывание даты' },
		{ id: 'selected', name: 'выбранные' },
	]

	const filtersForAction = {
		simple: (a, b) => a.id - b.id,
		price_top: (a, b) => a.fixedCost - b.fixedCost,
		price_bot: (a, b) => b.fixedCost - a.fixedCost,
		date_top: (a, b) => new Date(a.date) - new Date(b.date),
		date_bot: (a, b) => new Date(b.date) - new Date(a.date),
		selected: (a, b) => {
			const select = selectItems.items
			const bi = select.find(i => i.id === b.id)
			const ai = select.find(i => i.id === a.id)

			return select.indexOf(bi) - select.indexOf(ai)
		},
	}

	return (
		<div className={styles.inventory}>
			<div className={styles.profile_tittle}>
				<div className={styles.tittle}>
					<div className={styles.loading}>
						<Loading
							isLoading={isLoading}
							setLoading={() => setIsLoading(true)}
						/>
					</div>
					<div className={styles.name}>Мои предметы </div>
				</div>
				<div className={styles.filter}>
					<ComboBox
						name='filter'
						isReadOnly={isLoading}
						value={filterName}
						values={filtersForName}
						setValue={setFilterName}
						setIndex={setFilterIndex}
					/>
				</div>
				<div className={styles.buttons}>
					<div
						className={styles.button_withdraw}
						onClick={() => setIsOpenWithdrawWindow(true)}
					>
						<img alt='' src={Airplane} className={styles.image} />
						<div className={styles.text}>
							{selectItems.items.length !== 0 ? 'Вывести' : 'Вывести всё'}
						</div>
					</div>
					<div
						className={styles.button_sell}
						onClick={() => setIsOpenSellWindow(true)}
					>
						<img alt='' src={Cart} className={styles.image} />
						<div className={styles.text}>
							{selectItems.items.length !== 0 ? 'Продать' : 'Продать всё'}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.delimiter}></div>
			<div className={styles.inner}>
				<InventoryLayout
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					filter={primary => primary?.sort(filtersForAction[filterIndex])}
					filterName={filterName}
					additionalLoading={additionalLoading}
					createShowByLoaded={createShowByLoaded}
					loadPrimary={userApi.getInventory}
				/>
			</div>
			<ModalLayout
				isActive={isOpenSellWindow}
				close={() => {
					setSelectItems(prev => ({ ...prev, items: [] }))
					setIsOpenSellWindow(false)
					setIsLoading(true)
				}}
			>
				<SellWindow
					loadedItems={loadedItems}
					selectItems={selectItems}
					setSelectItems={setSelectItems}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={isOpenWithdrawWindow}
				close={() => {
					setSelectItems(prev => ({ ...prev, items: [] }))
					setIsOpenWithdrawWindow(false)
					setIsLoading(true)
				}}
			>
				<WithdrawWindow
					isLoading={isLoading}
					loadedItems={loadedItems}
					selectItems={selectItems}
					setSelectItems={setSelectItems}
					setExchangeItem={setExchangeItem}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={exchangeItem}
				close={() => {
					setExchangeItem()
					setIsLoading(true)
				}}
			>
				<ExchangeWindow
					games={games}
					inventory={exchangeItem}
					selectItems={selectItems}
					setSelectItems={setSelectItems}
					close={() => {
						setExchangeItem()
						setIsLoading(true)
					}}
				/>
			</ModalLayout>
			<ModalLayout isActive={inventory} close={() => setInventory(null)}>
				<InventoryWindow
					inventory={inventory}
					setItem={setItem}
					close={() => {
						setInventory(null)
						setIsLoading(true)
					}}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={item}
				close={() => {
					setItem(null)
					setImage(null)
				}}
			>
				<ItemWindow
					item={item}
					image={image}
					setImage={setImage}
					setItem={setItem}
					openLoadWindow={setIsOpenLoadWindow}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={isOpenLoadWindow}
				close={() => setIsOpenLoadWindow(false)}
			>
				<LoadImageWindow
					file={image}
					setFile={setImage}
					width={200}
					height={200}
					sizeMb={1}
					regular={/\.(png)$/}
					description={'PNG (MAX. 200x200px | 1MB)'}
				/>
			</ModalLayout>
		</div>
	)
}

export default Inventory
