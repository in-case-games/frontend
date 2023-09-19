import React, { useState } from 'react'
import { Loading } from '../сommon/button'
import classes from "./payments-history.module.css"

const History = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const d = new Date(props.date)
	const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

	const handleCost = (cost) => {
		let temp = Math.round(cost)
		if (temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
		else if (temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

		return temp
	}

	const getBackgroundColor = () => {
		if (isLoading || !props.isBackMoney) return "green"
		else if (error) return "red"
		else return "#006d7f"
	}

	const getColor = () => {
		if (isLoading || !props.isBackMoney) return "greenyellow"
		else if (error) return "black"
		else return "rgb(141 254 255)"
	}

	const getSymbol = () => {
		if (isLoading) return <Loading isLoading={isLoading} click={() => { }} cursor="default" />
		else if (error) return "✖"
		else if (props.isBackMoney) return "→"
		else return "✓"
	}

	const handleClick = () => {
		if ((props.isBackMoney || error) && !isLoading) {
			//TODO Back Money
			setIsLoading(true)
			setError(true)
		}
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
				onClick={handleClick}
				style={{ background: getBackgroundColor(), color: getColor(), cursor: props.isBackMoney && !isLoading ? "pointer" : "default" }}>{getSymbol()}</div>
		</div>
	)
}

export default React.memo(History)