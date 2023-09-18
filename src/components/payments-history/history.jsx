import React from 'react'
import classes from "./payments-history.module.css"

const History = (props) => {
	const d = new Date(props.date)
	const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

	const handleCost = (cost) => {
		let temp = Math.round(cost)
		if (temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
		else if (temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

		return temp
	}

	return (
		<div className={classes.history}>
			<div className={classes.history_content}>
				<div className={classes.history_money}>
					<div className={classes.history_amount}>{handleCost(props.amount)}</div>
					<div className={classes.history_currency}>{props.currency}</div>
				</div>
				<div className={classes.history_tittle}>{date}</div>
			</div>
			<div
				className={classes.history_btn}
				style={{ background: props.isBackMoney ? "#006d7f" : "green", color: props.isBackMoney ? "rgb(141 254 255)" : "greenyellow", cursor: props.isBackMoney ? "pointer" : "default" }}>{props.isBackMoney ? "→" : "✓"}</div>
		</div>
	)
}

export default History