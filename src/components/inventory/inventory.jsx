import React, { useEffect, useState } from 'react'
import { User } from '../../services/api'
import { Modal, SellWindow, WithdrawWindow } from "../modal"
import { CounterSlider } from '../slider'
import classes from "./inventory.module.css"
import LazyLoadedInventory from './lazy-loaded-inventory'

const Inventory = (props) => {
		const types = {
			"simple": (a, b) => a.id - b.id,
			"price-top": (a, b) => a.fixedCost - b.fixedCost,
			"price-bot": (a, b) => b.fixedCost - a.fixedCost,
			"date-top": (a, b) => new Date(a.date) - new Date(b.date),
			"date-bot": (a, b) => new Date(b.date) - new Date(a.date),
			"selected": (a, b) => props.selectItems.items.indexOf(b.id) - props.selectItems.items.indexOf(a.id)
		};
		const [tempFilter, setTempFilter] = useState("simple");
		const [isClickSlider, setIsClickSlider] = useState(false);
		const [primaryInventory, setPrimaryInventory] = useState([]);
		const [loadedInventory, setLoadedInventory] = useState([]);
		const [showInventory, setShowInventory] = useState(null);
		const [pages, setPages] = useState(1);
		const [page, setPage] = useState(1);

		const sliderClick = (number) => {
				if(props.isLoading === false && isClickSlider === false) {
						setIsClickSlider(true);

						if(number < 0) setPage(page + number > 1 ? page + number : 1);
						else setPage(page + number < pages ? page + number : pages);

						props.setIsLoading(true);
				}
		};

		const sellClick = async (id) => {
				props.setSelectItem(id);
				props.exchangeModal("sell");
		};

		const withdrawClick = async (id) => {
				props.setSelectItem(id);
				props.exchangeModal("withdraw");
		};

		useEffect(() => {
			const interval = setInterval(async () => {
					if(!props.isLoading) props.setIsLoading(true);
			}, 10000);

			return () => clearInterval(interval);
		});

		useEffect(() => {
				const interval = setInterval(async () => {
						try {
								const userApi = new User();
					
								async function loadInventory(isAllReload) {
										let primary = primaryInventory;
										let pagesTemp = pages;
				
										if(isAllReload) {
												primary = await userApi.getInventory();

												pagesTemp = Math.ceil(primary.length / 20);
				
												setPrimaryInventory(primary);
												setPages(pagesTemp);
						
												if(page > pagesTemp) setPage(pages);
										}

										primary.sort(types[props.filter]);

										LazyLoadedInventory({ 
											"isAllReload" : isAllReload,
											"primaryInventory" : primary, 
											"loadedInventory": loadedInventory,
											"page": page > pages ? pagesTemp : page,
											"itemProps": {
													"selectItems": props.selectItems,
													"setSelectItems": props.setSelectItems,
													"sellClick": sellClick,
													"withdrawClick": withdrawClick
											},
											"setLoadedInventory": setLoadedInventory,
											"setShowInventory": setShowInventory,
											"backAll": () => setPage(page - 1 < 1 ? 1 : page - 1)
										});
								}
								
								if(props.isLoading && isClickSlider) {
										loadInventory(false);

										props.setIsLoading(false);
										setIsClickSlider(false);
								}
								else if(props.isLoading && !isClickSlider) {
										loadInventory(true);

										props.setIsLoading(false);
								}
								else if(
									props.isLoading === false && 
									!isClickSlider && 
									tempFilter !== props.filter) 
								{
										setTempFilter(props.filter);
										setPage(1);
										setLoadedInventory([]);

										props.setIsLoading(true);
								}
						}
						catch(err) {}
				}, 100);

				return () => clearInterval(interval);
		});

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
						{
								props.isActiveModal("withdraw") ? 
								<Modal 
                active={props.isActiveModal("withdraw")} 
                clickChange={props.exchangeModal} 
                content={
									<WithdrawWindow 
										selectItem={props.selectItem} 
										selectItems={props.selectItems}
										primaryInventory={primaryInventory}
									/>}
            		/> : null
						}
						{
								props.isActiveModal("sell") ?
								<Modal 
                active={props.isActiveModal("sell")} 
                clickChange={props.exchangeModal} 
                content={
									<SellWindow 
										selectItem={props.selectItem} 
										selectItems={props.selectItems}
										primaryInventory={primaryInventory}
									/>}
            		/> : null
						}
				</div>
		);
};

export default Inventory;