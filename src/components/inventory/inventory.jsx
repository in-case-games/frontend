import React, { useEffect, useState } from 'react'
import User from '../../services/api/user'
import classes from "./inventory.module.css"
import Item from "./item"

const Inventory = (props) => {
		const userApi = new User();
		const [isStart, setIsStart] = useState(true);
		const [inventories, setInventories] = useState([]);

		useEffect(() => {
			const interval = setInterval(async () => {
				try {
						setIsStart(false);
						const inventory = await userApi.getInventory();
						setInventories(inventory);
				} 
				catch (err) { }
			}, (isStart ? 1 : 10000));

			return () => clearInterval(interval);
		});

		return(
				<div className={classes.inventory}>
						{inventories.map((inventory) => 
								<Item 
									item={inventory.item} 
									id={inventory.id} 
									selectItems={props.selectItems}
									setSelectItems={(props.setSelectItems)}
								/>
						)}
				</div>
		);
};

export default Inventory;