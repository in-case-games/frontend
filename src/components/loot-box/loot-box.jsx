import React from 'react'
import { Box as BoxImage } from '../../assets/images/additional'
import { InCoinOrange } from '../../assets/images/icon'
import classes from "./loot-box.module.css"

const LootBox = (props) => {
	const handleCost = (cost) => {
		let temp = Math.round(cost)
		if (temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
		else if (temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

		return temp
	}

	return (
		<div className={classes.box} onClick={() => props.showBox(props.box)}>
			<img
				src={props.box?.image ?? BoxImage}
				alt=""
				style={{ background: "gray" }}
			/>
			<div className={classes.box_info}>
				<div className={classes.box_name}>{props.box.name}</div>
				<div className={classes.box_cost}>
					{handleCost(props.box.cost)}
					<img alt="" src={InCoinOrange} />
				</div>
				<div className={classes.box_game}>{props.box.game}</div>
			</div>
		</div>
	)
}

export default React.memo(LootBox)