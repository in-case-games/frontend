import React from 'react'
import classes from "./inventory.module.css"

const Item = (props) => {
	return(
		<div className={classes.inventory_item}>
				{console.log(props.id)}
				{console.log(props.item)}
		</div>
	);
};

export default Item;