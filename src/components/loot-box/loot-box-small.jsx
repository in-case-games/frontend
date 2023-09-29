import React from 'react'
import { Box } from '../../assets/images/additional'
import classes from "./loot-box.module.css"

const LootBoxSmall = (props) => {
	return (
		<div className={classes.box_small} onClick={() => props.showBox(props.box)}>
			<img src={props.box?.image ?? Box} alt="" />
		</div>
	)
}

export default React.memo(LootBoxSmall)