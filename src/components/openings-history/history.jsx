import React, { useState } from 'react'
import { Box, Item } from '../../assets/images/additional'
import { itemGradients } from '../item/item-colors'
import classes from "./history.module.css"

const History = (props) => {
	const d = new Date(props.date)
	const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
	const [gradientColor,] = useState(itemGradients[props.item.rarity ? props.item.rarity : "white"])

	const handleCost = (cost) => {
		let temp = Math.round(cost)
		if (temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
		else if (temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

		return temp
	}

	return (
		<div className={classes.history}>
			<div className={classes.history_tittle}>{date}</div>
			<div className={classes.history_content}>
				<div className={classes.history_box}>
					<img className={classes.box_img} alt="" src={Box}></img>
					<div className={classes.box_content}>
						<p>Кейс:</p>
						<div className={classes.info}>
							<p>
								{
									props.box.name.length > 25 ?
										props.box.name.substring(0, 25) + "..." :
										props.box.name
								}
							</p>
							<p>{handleCost(props.box.cost)}</p>
						</div>
						<p className={classes.game}>
							{props.item.game}
						</p>
					</div>
				</div>
				<div className={classes.vertical_delimiter}></div>
				<div className={classes.history_item}>
					<div className={classes.box_content}>
						<p>Предмет:</p>
						<div className={classes.info}>
							<p>
								{
									props.item.name.length > 25 ?
										props.item.name.substring(0, 25) + "..." :
										props.item.name
								}
							</p>
							<p>{handleCost(props.item.cost)}</p>
						</div>
						<p className={classes.game}>
							{props.item.game}
						</p>
					</div>
					<img
						className={classes.item_img}
						alt="" src={Item}
						style={{ background: gradientColor }}></img>
				</div>
			</div>
		</div>
	)
}

export default History