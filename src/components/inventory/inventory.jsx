import React, { useEffect, useState } from 'react'
import { User } from '../../services/api'
import { ExchangeWindow, Modal, SellWindow, WithdrawWindow } from "../modal"
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
		const [exchangeItem, setExchangeItem] = useState(null);
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
												pagesTemp = pagesTemp === 0 ? 1 : pagesTemp
				
												setPrimaryInventory(primary);
												setPages(pagesTemp);
						
												if(page > pagesTemp) setPage(pagesTemp);
										}

										primary.sort(types[props.filter]);

										LazyLoadedInventory({ 
											"isAllReload" : isAllReload,
											"primaryInventory" : primary, 
											"loadedInventory": loadedInventory,
											"page": page > pagesTemp ? pagesTemp : page,
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
                props.isActiveModal("exchange") ?
                <Modal 
										active={props.isActiveModal("exchange")} 
										clickChange={() => { 
											props.exchangeModal("withdraw");
											props.setIsLoading(true);
										}} 
                    content={
                        <ExchangeWindow 
                            inventory={exchangeItem}
														selectItem={props.selectItem} 
														setSelectItem={props.setSelectItem}
														selectItems={props.selectItems}
														setSelectItems={props.setSelectItems}
														closeWindow={() => { 
															props.exchangeModal("withdraw");
															props.setIsLoading(true);
														}}
                        />}
                /> : null
            }
						{
								props.isActiveModal("withdraw") ? 
								<Modal 
									active={props.isActiveModal("withdraw")} 
									clickChange={(active) => { 
										props.exchangeModal(active);
										props.setIsLoading(true);
									}} 
									content={
										<WithdrawWindow 
											selectItem={props.selectItem} 
											setSelectItem={props.setSelectItem}
											selectItems={props.selectItems}
											setSelectItems={props.setSelectItems}
											setExchangeItem={(item) => { 
													setExchangeItem(item);
													props.exchangeModal("exchange"); 
													props.setIsLoading(true);
											}}
											pullPrimaryInventory={() => {
													let startIndex = (page - 1) * 20;
													let endIndex = startIndex + 20;
											
													if(endIndex > primaryInventory.length) endIndex = primaryInventory.length;
													if(startIndex > primaryInventory.length) startIndex = endIndex - 20 > 0 ? endIndex - 20 : 0;

													return primaryInventory.slice(startIndex, endIndex)
												}
											}
											closeWindow={() => { 
												props.exchangeModal("close");
												props.setIsLoading(true);
											}}
										/>}
            		/> : null
						}
						{
								props.isActiveModal("sell") ?
								<Modal 
									active={props.isActiveModal("sell")} 
									clickChange={(active) => { 
										props.exchangeModal(active);
										props.setIsLoading(true);
									}} 
									content={
										<SellWindow 
											selectItem={props.selectItem} 
											setSelectItem={props.setSelectItem}
											selectItems={props.selectItems}
											setSelectItems={props.setSelectItems}
											pullPrimaryInventory={() => {
													let startIndex = (page - 1) * 20;
													let endIndex = startIndex + 20;
											
													if(endIndex > primaryInventory.length) endIndex = primaryInventory.length;
													if(startIndex > primaryInventory.length) startIndex = endIndex - 20 > 0 ? endIndex - 20 : 0;

													return primaryInventory.slice(startIndex, endIndex)
												}
											}
											closeWindow={() => { 
												props.exchangeModal("close");
												props.setIsLoading(true);
											}}
										/>}
            		/> : null
						}
				</div>
		);
};

export default Inventory;