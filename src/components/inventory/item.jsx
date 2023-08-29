import React, { useEffect, useState } from 'react'
import { Item as ItemImg } from '../../assets/images/additional'
import { AirPlane, InCoinWhite } from '../../assets/images/icon'
import { itemColors, itemGradients } from '../item/item-colors'
import classes from "./inventory.module.css"

const Item = (props) => {
		const [isStart, setIsStart] = useState(true);
		const [borderColor, setBorderColor] = useState(props.color ? props.color : "white");
		const [gradientColor, setGradientColor] = useState(itemGradients[props.color ? props.color : "white"]);
		const d = new Date(props.date);
		const date = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

		const handleClick = () => {
				let temp = props.selectItems.items;
				const index = temp.indexOf(props.id);

				if(index === -1) {
						temp.push(props.id)
						const newSelectItems = {...props.selectItems, temp}
						props.setSelectItems(newSelectItems);
				}
				else {
						temp.splice(index, 1)
						const newSelectItems = {...props.selectItems, temp}
						props.setSelectItems(newSelectItems);
				}

				const isSelected = temp.indexOf(props.id) > -1;
				const color = props.color ?? "white";
				const borderColor = isSelected ? "green" : itemColors[color];
				const gradientColor = itemGradients[isSelected ? "green" : color];

				setBorderColor(borderColor);
				setGradientColor(gradientColor);
		};

		useEffect(() => {
				const interval = setInterval(() => {
						if(isStart) {
								setIsStart(false);

								const isSelected = props.selectItems.items.indexOf(props.id) > -1;
								const color = props.color ?? "white";
								const borderColor = isSelected ? "green" : itemColors[color];
								const gradientColor = itemGradients[isSelected ? "green" : color];
				
								setBorderColor(borderColor);
								setGradientColor(gradientColor);
						}
				}, 10);

				return () => clearInterval(interval);
		});
		
		return(
			<div className={classes.inventory_item} style={{borderBottom: `5px solid ${borderColor}`}}>
				<div className={classes.item} style={{background: gradientColor}} onClick={() => handleClick()}>
						<div className={classes.item_img}>
								<img alt="" href="#" src={ItemImg}/>
						</div>
						<div className={classes.item_info}>
								<p className={classes.info_name}>{props.name}</p>
								<p className={classes.info_cost}>
										{Math.round(props.cost)}
										<img alt="" href="#" src={InCoinWhite}/>
								</p>
								<p className={classes.info_date}>{date}</p>
						</div>
				</div>
				<div className={classes.item_buttons}>
						<div className={classes.buttons}>
								<img alt="" href="/#" className={classes.btn_withdraw} src={AirPlane}/>
						</div>
						<div className={classes.buttons}>
								<div className={classes.btn_sell}>$</div>
						</div>
					</div>
			</div>
		);
};

export default React.memo(Item);