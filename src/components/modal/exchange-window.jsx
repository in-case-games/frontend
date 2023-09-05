import React, { useEffect, useState } from 'react'
import { Item } from '../../services/api'
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const ExchangeWindow = (props) => {
		const [isLoading, setIsLoading] = useState(true);
		const [bannedRefresh, setBannedRefresh] = useState(false);
		const [exchangeItems, setExchangeItems] = useState({ items: []});
		const [allowedCost, setAllowedCost] = useState(Math.floor(props.inventory.cost));
		const [primaryItems, setPrimaryItems] = useState([]);
		const [showItems, setShowItems] = useState([]);

		const changeClick = () => {

		};
		
		useEffect(() => {
				const interval = setInterval(async () => {
						if(isLoading && !bannedRefresh) {
								setBannedRefresh(true);

								const itemApi = new Item();
								const primary = await itemApi.getItems();
								const show = primary.filter(i => i.cost <= props.inventory.cost);

								setPrimaryItems(primary);
								setShowItems(show);

								setIsLoading(false);
								setBannedRefresh(false);
						}
				}, 100);

				return () => clearInterval(interval);
		});

		return(
		<div className={classes.exchange_window}>
				<div className={classes.exchange_content}>
						<div className={classes.exchange_tittle}>
                <Loading isLoading={isLoading} click={() => {}} cursor="default"/>
                <div className={classes.tittle}>Обмен предметов</div>
            </div>
						{
								exchangeItems.items.length > 0 ?
								<div className={classes.btn_main} onClick={() => changeClick()}>Обменять</div> :
								null
						}
						<div className={classes.delimiter}></div>
						<div className={classes.choose_items} style={showItems.length > 3 ? {overflowY: "scroll"} : {overflowY: 'hidden'}}>
								{showItems.map(i => <div key={i.id}>{i.id}</div>)}
						</div>
						<div className={classes.delimiter}></div>
						<div className={classes.exchange_counters}>
								<div className={classes.counter_items} style={{background: "green"}}>{10 - exchangeItems.items.length} предметов</div>
								<div className={classes.counter_costs} style={{background: allowedCost >= 0 ? "green" : "red"}}>{allowedCost} инкоинов</div>
						</div>
				</div>
		</div>);
};

export default ExchangeWindow;