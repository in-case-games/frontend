import React, { useEffect, useState } from 'react'
import { Item as ItemImage } from '../../assets/images/additional'
import { InCoinOrange } from '../../assets/images/icon'
import { StatusUpdateDate } from '../сommon/button'
import { itemGradients } from './item-colors'
import classes from "./item.module.css"

const Item = (props) => {
	const [gradientColor, setGradientColor] = useState(itemGradients[props.item.rarity ? props.item.rarity : "white"])

	useEffect(() => {
		const interval = setInterval(() => {
			setGradientColor(itemGradients[props.item.rarity ? props.item.rarity : "white"])
		}, 1000)

		return () => clearInterval(interval)
	})

	const handleCost = (cost) => {
		let temp = Math.round(cost)
		if (temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
		else if (temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

		return temp
	}

	return (
		<div className={classes.item} onClick={() => props.showItem(props.item)}>
			<img src={props.item?.image ?? ItemImage} alt="" style={{ background: gradientColor }} />
			<div className={classes.item_info}>
				<div className={classes.info_name}>{props.item.name}</div>
				<div className={classes.info_cost}>
					{handleCost(props.item.cost)}
					<img alt="" src={InCoinOrange} />
				</div>
				<div className={classes.info_game}>{props.item.game}</div>
			</div>
			<StatusUpdateDate updateDate={props.item?.updateDate} secondsUpdate={300} />
		</div>
	)
}

export default Item