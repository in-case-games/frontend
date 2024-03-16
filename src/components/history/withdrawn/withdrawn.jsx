import React, { useEffect, useState } from 'react'
import { User as UserApi } from '../../../api'
import { InCoin } from '../../../assets/images/icons'
import { TemplateItem as ItemImage } from '../../../assets/images/main'
import Constants from '../../../constants'
import { Converter } from '../../../helpers/converter'
import { Handler } from '../../../helpers/handler'
import { LoadingArrow as Loading } from '../../loading'
import styles from './withdrawn.module'

const Withdrawn = props => {
	const userApi = new UserApi()

	const [gradientColor, setGradientColor] = useState(
		Constants.ItemGradients[
			props.history.item.rarity ? props.history.item.rarity : 'white'
		]
	)

	useEffect(() => {
		const interval = setInterval(
			() =>
				setGradientColor(
					Constants.ItemGradients[
						props.history.item.rarity ? props.history.item.rarity : 'white'
					]
				),
			1000
		)

		return () => clearInterval(interval)
	})

	const getBackgroundColor = () =>
		props.history.status === 'cancel' || props.history.status === 'blocked'
			? 'red'
			: 'green'

	const getColor = () =>
		props.history.status === 'cancel' || props.history.status === 'blocked'
			? 'black'
			: 'greenyellow'

	const getSymbol = () => {
		if (
			props.history.status === 'purchase' ||
			props.history.status === 'transfer' ||
			props.history.status === 'recorded'
		) {
			return (
				<div className={styles.loading}>
					<Loading isLoading={true} click={() => {}} cursor='default' />
				</div>
			)
		} else if (props.history.status === 'given') return '✓'
		else if (props.history.status === 'blocked') return 'Ban'
		else return '✖'
	}

	const click = async () => {
		if (props.history.status === 'cancel') {
			await Handler.error(async () => {
				var response = await userApi.transferWithdrawn(props.history.id)

				setTimeout(() => window.location.reload(), 2000)

				return response
			})
		}
	}

	return (
		<div className={styles.history}>
			<div className={styles.history_content}>
				<div
					className={styles.history_item}
					style={{ background: gradientColor }}
				>
					<img
						alt=''
						className={styles.image}
						src={props.history.item?.image ?? ItemImage}
						onClick={e => {
							e.stopPropagation()
							props.showItem()
						}}
					/>
				</div>
				<div className={styles.history_info} onClick={props.click}>
					<div className={styles.date}>
						{Converter.getMiniDate(props.history.date)}
					</div>
					<div className={styles.info}>
						<div className={styles.name}>
							{Converter.cutString(props.history.item.name, 25)}
						</div>
						<div className={styles.cost}>
							{Converter.cutCost(props.history.fixedCost)}
							<img alt='' className={styles.image} src={InCoin} />
						</div>
					</div>
					<div className={styles.invoice_id}>{props.history.invoiceId}</div>
				</div>
			</div>
			<div
				className={styles.button_status}
				style={{
					background: getBackgroundColor(),
					color: getColor(),
					cursor: props.history.status === 'cancel' ? 'pointer' : 'default',
				}}
				onClick={click}
			>
				{getSymbol()}
			</div>
		</div>
	)
}

export default React.memo(Withdrawn)
