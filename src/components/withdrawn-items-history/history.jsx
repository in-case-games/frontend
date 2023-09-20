import React, { useState } from 'react'
import { Item } from '../../assets/images/additional'
import { InCoinOrange } from '../../assets/images/icon'
import { User } from '../../services/api'
import { itemGradients } from '../item/item-colors'
import { Loading } from '../сommon/button'
import classes from "./withdrawn-items-history.module.css"

const History = (props) => {
	const userApi = new User()
	const d = new Date(props.date)
	const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
	const [gradientColor,] = useState(itemGradients[props.item.rarity ? props.item.rarity : "white"])

	const handleCost = (cost) => {
		let temp = Math.round(cost)
		if (temp >= 1000000) temp = `${Math.round(temp / 10) / 100000}M`
		else if (temp >= 1000) temp = `${Math.round(temp / 10) / 100}K`

		return temp
	}

	const getBackgroundColor = () => {
		if (props.status === "purchase" || props.status === "transfer" || props.status === "given")
			return "green"
		else return "red"
	}

	const getColor = () => {
		if (props.status === "purchase" || props.status === "transfer" || props.status === "given")
			return "greenyellow"
		else return "red"
	}

	const getSymbol = () => {
		if (props.status === "purchase" || props.status === "transfer") {
			return (
				<Loading
					isLoading={props.status !== "given" || props.status !== "cancel"}
					click={() => { }} cursor="default" />
			)
		}
		else if (props.status === "given") return "✓"
		else return "✖"
	}

	const handleClick = async () => {
		console.log(props.id)
		if (props.status === "cancel") {
			try {
				await userApi.transferWithdrawnItemInInventory(props.id)
			}
			catch (err) {

			}
		}
	}

	return (
		<div className={classes.history} onClick={() => console.log("marketId: " + props.marketId)}>
			<div className={classes.history_content}>
				<div className={classes.history_item} style={{ background: gradientColor }}>
					<img alt="" src={Item} onClick={() => props.showItem()} />
				</div>
				<div className={classes.history_info}>
					<div className={classes.info_date}>{date}</div>
					<div className={classes.info_main}>
						<div className={classes.info_name}>
							{
								props.item.name.length > 25 ?
									props.item.name.substring(0, 25) + "..." :
									props.item.name
							}
						</div>
						<div className={classes.info_cost}>
							{handleCost(props.fixedCost)}
							<img alt="" src={InCoinOrange} />
						</div>
					</div>
					<div className={classes.info_invoice_id}>{props.invoiceId}</div>
				</div>
			</div>
			<div className={classes.history_btn}
				style={{ background: getBackgroundColor(), color: getColor(), cursor: props.status === "cancel" ? "pointer" : "default" }}
				onClick={handleClick}>
				{getSymbol()}
			</div>
		</div>
	)
}

export default React.memo(History)