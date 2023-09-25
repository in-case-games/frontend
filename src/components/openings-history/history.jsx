import React, { useEffect, useState } from 'react'
import { Box, Item } from '../../assets/images/additional'
import { InCoinOrange } from '../../assets/images/icon'
import { itemGradients } from '../item/item-colors'
import classes from "./history.module.css"

const History = (props) => {
	const d = new Date(props.date)
	const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
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
		<div className={classes.history}>
			<div className={classes.history_tittle}>{date}</div>
			<div className={classes.history_content}>
				<div className={classes.history_box}>
					<a className={classes.box_img} target='_blank' rel="noopener noreferrer" href={`/box/${props.box.id}`}>
						<img
							alt=""
							src={props.box.image ?? Box}
						/>
					</a>
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
							<p className={classes.info_cost}>
								{handleCost(props.box.cost)}
								<img alt="" src={InCoinOrange} />
							</p>
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
							<p className={classes.info_cost}>
								{handleCost(props.item.cost)}
								<img alt="" src={InCoinOrange} />
							</p>
						</div>
						<p className={classes.game}>
							{props.item.game}
						</p>
					</div>
					<img
						className={classes.item_img}
						alt="" src={props.item.image ?? Item}
						style={{ background: gradientColor }}
						onClick={() => props.showItem()}
					/>
				</div>
			</div>
		</div>
	)
}

export default React.memo(History)