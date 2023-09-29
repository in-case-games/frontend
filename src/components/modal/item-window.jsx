import React, { useEffect, useState } from "react"
import { Item } from '../../assets/images/additional'
import { Game, Item as ItemApi } from '../../services/api'
import TokenService from '../../services/token'
import { itemGradients } from '../item/item-colors'
import { InfoLine, StatusUpdateDate } from '../сommon/button'
import Loading from '../сommon/button/loading'
import classes from "./modal.module.css"

const ItemWindow = (props) => {
	const itemApi = new ItemApi()
	const gameApi = new Game()

	const patternItem = {
		game: "csgo",
		type: "none",
		rarity: "white",
		quality: "none"
	}

	const [isLoading, setIsLoading] = useState(true)
	const [isClickChange, setIsClickChange] = useState(false)

	const [endTimeBackOperation, setEndTimeBackOperation] = useState(null)
	const [operation, setOperation] = useState(null)

	const [gradientColor, setGradientColor] = useState(itemGradients[props.item?.rarity ? props.item.rarity : "white"])

	const [user, setUser] = useState(TokenService.getUser())
	const [item, setItem] = useState(props.item?.id ? props.item : patternItem)
	const [rarities, setRarities] = useState([])
	const [types, setTypes] = useState([])
	const [qualities, setQualities] = useState([])
	const [games, setGames] = useState([])

	const setValue = (value) => {
		setIsClickChange(true)
		setItem(value)
	}

	useEffect(() => {
		const interval = setInterval(
			async () => {
				if (endTimeBackOperation !== null) {
					let temp = endTimeBackOperation - 1
					temp = temp >= 0 ? temp : 0

					setEndTimeBackOperation(temp)

					if (temp === 0) {
						await operations[operation]()

						setOperation(null)
						setEndTimeBackOperation(null)
					}
				}
			}, 1000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => setIsLoading(!isClickChange), 5000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isLoading) {
				setUser(TokenService.getUser())

				setItem(props.item?.id ?
					await itemApi.getItem(props.item?.id) : patternItem)

				setTypes(await itemApi.getTypes())
				setRarities(await itemApi.getRarities())
				setQualities(await itemApi.getQualities())
				setGames(await gameApi.getGames())
				setGradientColor(itemGradients[item.rarity])

				setIsLoading(false)
			}
			setGradientColor(itemGradients[props.item?.rarity ? props.item.rarity : "white"])
		}, 100)

		return () => clearInterval(interval)
	})

	const loadImg = () => {
		if (user.role === "owner") props.openLoadWindow(true)
	}

	const handleClick = (isOperationDelete = false) => {
		if (endTimeBackOperation > 0) {
			setEndTimeBackOperation(null)
			setOperation(null)
		}
		else if (endTimeBackOperation === null) {
			setEndTimeBackOperation(5)

			if (isOperationDelete) setOperation("deleteItem")
			else if (item?.id) setOperation("updateItem")
			else setOperation("createItem")
		}
	}

	const deleteItem = async () => {
		await itemApi.deleteItem(item.id)

		props.setImage(null)
		props.setItem()
		setItem(patternItem)
		setIsClickChange(false)
		setIsLoading(true)
	}

	const updateItem = async () => {
		item.image = props.image
		item.gameId = games.find(r => r.name === item.game).id
		item.rarityId = rarities.find(r => r.name === item.rarity).id
		item.qualityId = qualities.find(q => q.name === item.quality).id
		item.typeId = types.find(t => t.name === item.type).id

		const response = await itemApi.updateItem(item)

		response.image = props.image || props.item?.image

		props.setImage(null)
		props.setItem(response)
		setItem(response)
		setIsClickChange(false)
		setIsLoading(true)
	}

	const createItem = async () => {
		item.image = props.image
		item.gameId = games.find(r => r.name === item.game).id
		item.rarityId = rarities.find(r => r.name === item.rarity).id
		item.qualityId = qualities.find(q => q.name === item.quality).id
		item.typeId = types.find(t => t.name === item.type).id

		const response = await itemApi.createItem(item)

		response.image = props.image || props.item?.image

		props.setImage(null)
		props.setItem(response)
		setItem(response)
		setIsClickChange(false)
		setIsLoading(true)
	}

	const operations = {
		"createItem": createItem,
		"deleteItem": deleteItem,
		"updateItem": updateItem
	}

	return (
		<div className={classes.item_window}>
			<div className={classes.item_content}>
				<div className={classes.item_header}>
					<Loading isLoading={isLoading} click={() => {
						setIsClickChange(false)
						setIsLoading(true)
						props.setImage(null)
					}} />
					<div className={classes.item_tittle}>Информация по предмету</div>
				</div>
				<div className={classes.item_info}>
					<div className={classes.item_img} onClick={() => loadImg()} style={{ cursor: user.role === "owner" ? "pointer" : "default" }}>
						{
							<img
								alt=""
								src={props?.image || props?.item?.image || Item}
								style={{ background: gradientColor }}
							/>
						}
						<StatusUpdateDate updateDate={item?.updateDate} secondsUpdate={300} />
					</div>
					<div className={classes.delimiter}></div>
					<div className={classes.item_sub_tittle}>Подробная информация</div>
					<div className={classes.info_additional}>
						<InfoLine
							value={item?.name}
							setValue={value => setValue({ ...item, name: value })}
							name="item-name"
							placeholder="Название"
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.cost}
							setValue={value => setValue({ ...item, cost: value })}
							name="item-cost"
							placeholder="Стоимость"
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.game}
							setValue={value => setValue({ ...item, game: value })}
							name="item-game"
							placeholder="Игра"
							isReadOnly={user.role !== "owner"}
							comboBox={games}
						/>
						<InfoLine
							value={item?.hashName}
							setValue={value => setValue({ ...item, hashName: value })}
							name="item-hash-name"
							placeholder="Хэш имя"
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.idForMarket}
							setValue={value => setValue({ ...item, idForMarket: value })}
							name="item-id-for-market"
							placeholder="Идентификатор"
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.quality ?? "none"}
							setValue={value => setValue({ ...item, quality: value })}
							isReadOnly={user.role !== "owner"}
							name="item-quality"
							placeholder="Качество"
							comboBox={qualities}
						/>
						<InfoLine
							value={item?.rarity ?? "white"}
							setValue={value => setValue({ ...item, rarity: value })}
							name="item-rarity"
							placeholder="Редкость"
							isReadOnly={user.role !== "owner"}
							comboBox={rarities}
						/>
						<InfoLine
							value={item?.type ?? "none"}
							setValue={value => setValue({ ...item, type: value })}
							name="item-type"
							placeholder="Тип"
							isReadOnly={user.role !== "owner"}
							comboBox={types}
						/>
					</div>
					{
						user.role === "owner" ?
							<div className={classes.info_buttons}>
								{
									endTimeBackOperation === null ?
										<div className={classes.btn_send} onClick={() => handleClick()}>
											{item?.id ? "Изменить" : "Создать"}
										</div> : null
								}
								{
									item?.id && endTimeBackOperation === null ?
										<div className={classes.btn_delete} onClick={() => handleClick(true)}>
											Удалить
										</div> : null
								}
								{
									endTimeBackOperation !== null ?
										<div className={classes.btn_back} onClick={() => handleClick()}>
											<p>Вернуть</p>
											<p className={classes.timer}>{endTimeBackOperation}</p>
										</div>
										: null
								}
							</div> : null
					}
				</div>
			</div>
		</div>
	)
}

export default ItemWindow