import React, { useEffect, useState } from 'react'
import { Item as ItemImage } from '../../assets/images/additional'
import { itemGradients } from './item-colors'
import classes from "./item.module.css"

const SmallItem = (props) => {
	const [gradientColor, setGradientColor] = useState(itemGradients[props.item.rarity ? props.item.rarity : "white"])

	useEffect(() => {
		const interval = setInterval(() => {
			setGradientColor(itemGradients[props.item.rarity ? props.item.rarity : "white"])
		}, 1000)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.small_item} onClick={() => props.showItem(props.item)}>
			<img src={props.item?.image ?? ItemImage} alt="" style={{ background: gradientColor }} />
		</div>
	)
}

export default React.memo(SmallItem)