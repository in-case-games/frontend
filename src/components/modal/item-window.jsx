import React, { useEffect, useState } from "react"
import { Item } from '../../assets/images/additional'
import { Item as ItemApi } from '../../services/api'
import TokenService from '../../services/token'
import { itemGradients } from '../item/item-colors'
import { InfoLine, StatusUpdateDate } from '../сommon/button'
import Loading from '../сommon/button/loading'
import classes from "./modal.module.css"

const ItemWindow = (props) => {
	const [isStart, setIsStart] = useState(true)
	const [isLoading, setIsLoading] = useState(true)
	const [gradientColor,] = useState(itemGradients[props.item?.rarity ? props.item.rarity : "white"])

	const [user, setUser] = useState(TokenService.getUser())
	const [item, setItem] = useState(props.item)

	useEffect(() => {
		const interval = setInterval(() => {
			setUser(TokenService.getUser())
			setIsLoading(true)
		}, 5000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isLoading && item?.id) {
				const itemApi = new ItemApi()

				setItem(await itemApi.getItem(item?.id))
				setIsLoading(false)
			}
			else if (!item?.id) {
				setItem(props.item)
				setIsLoading(false)
			}

			setIsStart(false)
		}, isStart ? 100 : 1000)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.item_window}>
			<div className={classes.item_content}>
				<div className={classes.item_header}>
					<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
					<div className={classes.item_tittle}>Информация по предмету</div>
				</div>
				<div className={classes.item_info}>
					<div className={classes.item_img}>
						<img alt="" src={Item} style={{ background: gradientColor }} />
						<StatusUpdateDate updateDate={item?.updateDate} secondsUpdate={300} />
					</div>
					<div className={classes.delimiter}></div>
					<div className={classes.info_additional}>
						<InfoLine
							value={item?.name}
							setValue={(value) => setItem({ ...item, name: value })}
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.cost}
							setValue={(value) => setItem({ ...item, cost: value })}
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.game}
							setValue={(value) => setItem({ ...item, game: value })}
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.hashName}
							setValue={(value) => setItem({ ...item, hashName: value })}
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.idForMarket}
							setValue={(value) => setItem({ ...item, idForMarket: value })}
							isReadOnly={user.role !== "owner"}
						/>
						<InfoLine
							value={item?.quality}
							setValue={(value) => setItem({ ...item, quality: value })}
							isReadOnly={user.role !== "owner"}
							comboBox={null}
						/>
						<InfoLine
							value={item?.rarity}
							setValue={(value) => setItem({ ...item, rarity: value })}
							isReadOnly={user.role !== "owner"}
							comboBox={null}
						/>
						<InfoLine
							value={item?.type}
							setValue={(value) => setItem({ ...item, type: value })}
							isReadOnly={user.role !== "owner"}
							comboBox={null}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemWindow