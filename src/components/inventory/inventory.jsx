import React, { useEffect, useState } from 'react'
import { Item as ItemApi } from "../../services/api"
import User from '../../services/api/user'
import { CounterSlider } from '../slider'
import classes from "./inventory.module.css"
import Item from "./item"

const Inventory = (props) => {
		const [isStart, setIsStart] = useState(true);
		const [inventoryFirst, setInventoryFirst] = useState([]);
		const [inventory, setInventory] = useState([]);
		const [pages, setPages] = useState(1);
		const [page, setPage] = useState(1);
		
		//TODO добавить круглишек загрузки и вытягивать расширеную информацию по страницам
		useEffect(() => {
				//TODO загружать новую информацию
		}, [page, pages]);

		useEffect(() => {
				const interval = setInterval(async () => {
						try {
								setIsStart(false);

								const userApi = new User();
								const itemApi = new ItemApi();

								let result = await userApi.getInventory();

								setInventoryFirst(result);

								result = await itemApi.getItemsByInventory(result);
								
								setInventory(result);
								setPages(Math.ceil(result.length / 20));
						} 
						catch (err) { }
				}, (isStart ? 1 : 10000));

				return () => clearInterval(interval);
		}, [isStart, inventory]);

		return(
				<div className={classes.inventory_content}>
						<div className={classes.inventory}>
								{inventory.map((i) => 
										<Item 
											img={i.item.img}
											name={i.item.name}
											color={i.item.rarity}
											date={i.date}
											cost={i.cost}
											id={i.id}
											selectItems={props.selectItems}
											setSelectItems={props.setSelectItems}
											key={i.id}
										/>
								)}
						</div>
						<CounterSlider
							pages={pages}
							page={page}
							setPage={setPage}
						/>
				</div>
		);
};

export default Inventory;