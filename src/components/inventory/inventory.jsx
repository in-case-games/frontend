import React, { useEffect, useState } from 'react'
import { Item as ItemApi } from "../../services/api"
import User from '../../services/api/user'
import classes from "./inventory.module.css"
import Item from "./item"

const Inventory = (props) => {
		const [isStart, setIsStart] = useState(true);
		const [inventories, setInventories] = useState([]);
		
		useEffect(() => {
				const interval = setInterval(async () => {
						try {
								const userApi = new User();
								const itemApi = new ItemApi();
								setIsStart(false);
								let inventory = await userApi.getInventory();
								inventory = await itemApi.getItemsByInventory(inventory);
								setInventories(inventory);
						} 
						catch (err) { }
				}, (isStart ? 1 : 10000));

				return () => clearInterval(interval);
		}, [isStart, inventories]);

		return(
				<div className={classes.inventory}>
						{inventories.map((inventory) => 
								<Item 
									img={inventory.item.img}
									name={inventory.item.name}
									color={inventory.item.rarity}
									date={inventory.date}
									cost={inventory.cost}
									id={inventory.id}
									selectItems={props.selectItems}
									setSelectItems={props.setSelectItems}
									key={inventory.id}
								/>
						)}
				</div>
		);
};

export default Inventory;