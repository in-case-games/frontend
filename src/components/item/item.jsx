import React from 'react'
import classes from "./item.module.css"

const Item = (props) => {
	return (
		<div className={classes.item}>
			<img src={props.item.img} alt="" />
		</div>
	)
}

export default Item