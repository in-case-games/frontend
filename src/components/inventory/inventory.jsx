import React, { useEffect, useState } from 'react'
import User from '../../services/api/user'
import { CounterSlider } from '../slider'
import classes from "./inventory.module.css"
import LazyLoadedInventory from './lazy-loaded-inventory'

const Inventory = (props) => {
		const [isStart, setIsStart] = useState(true);
		const [isClickSlider, setIsClickSlider] = useState(false);
		const [primaryInventory, setPrimaryInventory] = useState([]);
		const [loadedInventory, setLoadedInventory] = useState([]);
		const [showInventory, setShowInventory] = useState(null);
		const [pages, setPages] = useState(1);
		const [page, setPage] = useState(1);

		const sliderClick = (number) => {
				if(isStart && props.isLoading === false && isClickSlider === false) {
						if(number < 0) setPage(page + number > 1 ? page + number : 1);
						else if(number > 0) setPage(page + number < pages ? page + number : pages);

						setIsClickSlider(true);
				}
		};

		useEffect(() => {
				const userApi = new User();
				
				async function loadInventory(isAllReload) {
						let primary = primaryInventory;

						if(isAllReload) {
								primary = await userApi.getInventory();
								const pages = Math.ceil(primary.length / 20);
		
								setPrimaryInventory(primary);
								setPages(pages);
		
								if(page > pages) setPage(pages);
						}

						LazyLoadedInventory({ 
							"primaryInventory" : primary, 
							"loadedInventory": loadedInventory,
							"page": page > pages ? pages : page,
							"setLoadedInventory": setLoadedInventory,
							"selectItems": props.selectItems,
							"setSelectItems": props.setSelectItems,
							"setShowInventory": setShowInventory,
							"isAllReload" : isAllReload
						});
				}
				try {
						if(isStart && props.isLoading === false && isClickSlider) {
								setIsStart(false);
								setIsClickSlider(false);
								props.setIsLoading(true);
								loadInventory(false);
								props.setIsLoading(false);
								setIsStart(true);
						}
						else if(isStart && props.isLoading) {
								setIsStart(false);
								loadInventory(true);
								setIsStart(true);
								props.setIsLoading(false);
						}
				}
				catch(err) {}
		}, [isStart, props, page, pages, loadedInventory, primaryInventory, isClickSlider]);

		return(
				<div className={classes.inventory_content}>
						<div className={classes.inventory}>
								{showInventory}
						</div>
						<CounterSlider
							pages={pages}
							page={page}
							eventClick={sliderClick}
						/>
				</div>
		);
};

export default Inventory;