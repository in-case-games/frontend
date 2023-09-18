import React, { useState } from 'react'
import Constants from './constants'
import classes from "./modal.module.css"

const TradeUrlChangeWindow = (props) => {
		const [tradeUrl, setTradeUrl] = useState(Constants
			.CheckUndefinedNull(Constants.TradeURL[props.name ?? "csgo"](), ""));
		const [error, setError] = useState(false);
		const [apply, setApply] = useState(false);

		const getBorderColor = () => {
			if(error) return "red";
			else if(apply) return "green";
			else return "#F8B415";
		}

		const inputTradeUrl = (value) => {
        setTradeUrl(value);

        if(Constants.Regex[props.name].test(value)) {
						setError(false);
						setApply(true);
						Constants.UpdateTradeURL[props.name](value);
				}
				else {
					setError(true);
					setApply(false);
				}
    }

		return(
			<div className={classes.trade_url_change_window}>
					<div className={classes.trade_url_change_content}>
							<div className={classes.tittle}>Ссылка на обмен</div>
							<input 
								style={{borderColor: getBorderColor(), color: getBorderColor()}}
								maxLength={200}
								className={classes.input_form} 
								placeholder={props.nameTrade}
								value={tradeUrl} 
								onInput={e => inputTradeUrl(e.target.value)} 
								name="name-item"
							/>
							<div className={classes.delimiter}></div>
							<a className={classes.notify_message} 
								target='_blank' 
								rel="noopener noreferrer" 
								href={props.urlGetTrade ? props.urlGetTrade : "/#"}
							>
									{
										props.urlGetTrade ? 
										"Здесь можно взять ссылку - КЛИК" : 
										"Обратитесь в тех. поддержку, если не знаете, где взять ссылку на обмен"
									}
							</a>
					</div>
			</div>
		);
};

export default TradeUrlChangeWindow;