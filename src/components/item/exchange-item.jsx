import React, { useEffect, useState } from 'react'
import { Item as ItemImg } from '../../assets/images/additional'
import { InCoinWhite } from '../../assets/images/icon'
import classes from "./exchange-item.module.css"
import { itemColors, itemGradients } from './item-colors'

const ExchangeItem = (props) => {
		const [isStart, setIsStart] = useState(true);
		const [borderColor, setBorderColor] = useState(props.item.rarity);
		const [gradientColor, setGradientColor] = useState(itemGradients[props.item.rarity]);

		const getCost = () => {
			let temp = Math.round(props.item.cost);
			if(temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
			else if(temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

			return temp;
		}

		useEffect(() => {
			const interval = setInterval(() => {
					setIsStart(false);
					let temp = props.selectItems.items;
					const isSelected = temp.find(i => i.id === props.item.id) !== undefined;
					const color = props.item.rarity ?? "white";
					const borderColor = isSelected ? "green" : itemColors[color];
					const gradientColor = itemGradients[isSelected ? "green" : color];

					setBorderColor(borderColor);
					setGradientColor(gradientColor);
			}, isStart ? 10 : 300);

			return () => clearInterval(interval);
		});

		const getCountItems = () => {
			let count = 0;

			props.selectItems.items.forEach((i) => {
				count += i.count;
			});

			return count;
		};

		const handleClick = () => {
				let temp = props.selectItems.items;
				const item = temp.find(i => i.id === props.item.id);

				if(item === undefined && getCountItems() < 10) {
						temp.push({
							id: props.item.id,
							cost: props.item.cost,
							count: 1
						})
						const newSelectItems = {...props.selectItems, temp}
						props.setSelectItems(newSelectItems);
				}
				else if(item !== undefined) {
						const index = temp.indexOf(item);

						temp.splice(index, 1)
						const newSelectItems = {...props.selectItems, temp}
						props.setSelectItems(newSelectItems);
				}

				const isSelected = temp.find(i => i.id === props.item.id) !== undefined;
				const color = props.item.rarity ?? "white";
				const borderColor = isSelected ? "green" : itemColors[color];
				const gradientColor = itemGradients[isSelected ? "green" : color];

				setBorderColor(borderColor);
				setGradientColor(gradientColor);
				props.setClickItem(true);
		};
		
		return(
			<div className={classes.exchange_item} style={{borderBottom: `5px solid ${borderColor}`}}>
				<div className={classes.item} style={{background: gradientColor}} onClick={() => props.clickItem ? {} : handleClick()}>
						<div className={classes.item_img}>
								<img alt="" href="#" src={ItemImg}/>
						</div>
						<div className={classes.item_info}>
								<p className={classes.info_name}>{props.item.name.length > 25 ? props.item.name.substring(0, 25) + "..." : props.item.name}</p>
								<p className={classes.info_cost}>
										{getCost()}
										<img alt="" href="#" src={InCoinWhite}/>
								</p>
						</div>
				</div>
				<div className={classes.counter}></div>
			</div>
		);
};

export default ExchangeItem;