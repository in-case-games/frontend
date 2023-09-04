import React, { useEffect, useState } from 'react'
import { Item as ItemImg } from '../../assets/images/additional'
import { InCoinWhite } from '../../assets/images/icon'
import { Loading } from '../сommon/button'
import Constants from "./constants"
import { itemColors, itemGradients } from './item-colors'
import classes from "./status-item.module.css"

const StatusItem = (props) => {
		const [isStart, setIsStart] = useState(true);
		const [isLoading, setIsLoading] = useState(false);
		const [borderColor, setBorderColor] = useState(props.item.rarity);
		const [gradientColor, setGradientColor] = useState(itemGradients[props.item.rarity]);
		const [statusColor, setStatusColor] = useState(itemGradients[Constants.StatusAndColor[props.status]]);
		const [cursor, setCursor] = useState('default');

		const handleClick = () => {

		};

		useEffect(() => {
			const interval = setInterval(() => {
					setIsStart(false);


					const color = props.item.rarity;
					const borderColor = itemColors[color];
					const gradientColor = itemGradients[color];

					setStatusColor(itemGradients[Constants.StatusAndColor[props.status]]);
					setCursor(props.status === "exchange" ? "pointer" : "default");
					setBorderColor(borderColor);
					setGradientColor(gradientColor);
					setIsLoading(props.status === "loading");
			}, isStart ? 10 : 300);

			return () => clearInterval(interval);
	});

		const getCost = () => {
			let temp = Math.round(props.item.cost);
			if(temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
			else if(temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

			return temp;
		};

		return(
				<div className={classes.status_item} style={{borderBottom: `5px solid ${borderColor}`}}>
						<div className={classes.item} style={{background: gradientColor, cursor: cursor}} onClick={() => handleClick()}>
								<div className={classes.item_img}>
										<img alt="" href="#" src={ItemImg}/>
								</div>
								<div className={classes.item_info}>
										<p className={classes.info_name}>{props.item.name.length > 30 ? props.item.name.substring(0, 30) + "..." : props.item.name}</p>
										<p className={classes.info_cost}>
												{getCost()}
												<img alt="" href="#" src={InCoinWhite}/>
										</p>
								</div>
						</div>
						<div className={classes.status} style={{background: statusColor, cursor: cursor}}>
								{
									isLoading ? 
										<Loading isLoading={isLoading} click={() => {}}/> : 
										null
								}
						</div>
				</div>)
};

export default React.memo(StatusItem);