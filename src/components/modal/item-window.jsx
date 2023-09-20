import React, { useEffect, useState } from "react"
import { Item } from '../../assets/images/additional'
import { Item as ItemApi } from '../../services/api'
import TokenService from '../../services/token'
import { itemGradients } from '../item/item-colors'
import { InfoLine, StatusUpdateDate } from '../сommon/button'
import Loading from '../сommon/button/loading'
import classes from "./modal.module.css"

const ItemWindow = (props) => {
	const patternItem = {
		type: "none",
		rarity: "white",
		quality: "none"
	}

	const [isLoading, setIsLoading] = useState(true)
	const [isClickChange, setIsClickChange] = useState(false)

	const [gradientColor,] = useState(itemGradients[props.item?.rarity ? props.item.rarity : "white"])

	const [user, setUser] = useState(TokenService.getUser())
	const [item, setItem] = useState(props.item?.id ? props.item : patternItem)
	const [rarities, setRarities] = useState([])
	const [types, setTypes] = useState([])
	const [qualities, setQualities] = useState([])

	const setValue = (value) => {
		setIsClickChange(true)
		setItem(value)
	}

	useEffect(() => {
		const interval = setInterval(async () => setIsLoading(!isClickChange), 5000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isLoading) {
				setUser(TokenService.getUser())

				const itemApi = new ItemApi()

				setItem(props.item?.id ?
					await itemApi.getItem(props.item?.id) : patternItem)

				setTypes(await itemApi.getTypes())
				setRarities(await itemApi.getRarities())
				setQualities(await itemApi.getQualities())
			}

			setIsLoading(false)
		}, 100)

		return () => clearInterval(interval)
	})

	const loadImg = () => {
		if (user.role === "owner") props.openLoadWindow(true)
	}

	return (
		<div className={classes.item_window}>
			<div className={classes.item_content}>
				<div className={classes.item_header}>
					<Loading isLoading={isLoading} click={() => {
						setIsClickChange(false)
						setIsLoading(true)
						props.resetImage()
					}} />
					<div className={classes.item_tittle}>Информация по предмету</div>
				</div>
				<div className={classes.item_info}>
					<div className={classes.item_img} onClick={() => loadImg()}>
						<img alt="" src={Item} style={{ background: gradientColor }} />
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
						/>
						<InfoLine
							value={item?.hashName}
							setValue={value => setValue({ ...item, hashName: value })}
							name="item-hashName"
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
							<div className={classes.info_btn_send} onClick={() => console.log("Exchange")}>
								{item?.id ? "Изменить" : "Создать"}
							</div> : null
					}
				</div>
			</div>
		</div>
	)
}

export default ItemWindow