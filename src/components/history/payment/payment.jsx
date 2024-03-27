import React from 'react'
import { Converter } from '../../../helpers/converter'
import { LoadingArrow as Loading } from '../../loading'
import styles from './payment.module'

const Payment = props => {
	const getBackgroundColor = () => {
		if (props.history?.status?.name === 'canceled') return 'red'
		else return 'green'
	}

	const getColor = () => {
		if (props.history?.status?.name === 'succeeded') return 'greenyellow'
		else if (props.history?.status?.name === 'canceled') return 'black'
	}

	const getStatus = () => {
		if (props.history?.status?.name === 'succeeded') return '✓'
		else if (props.history?.status?.name === 'canceled') return '✖'
		else
			return (
				<div className={styles.loading}>
					<Loading isLoading={true} cursor='pointer' />
				</div>
			)
	}

	return (
		<div className={styles.history} onClick={props.click}>
			<div className={styles.history_content}>
				<div className={styles.history_money}>
					<div className={styles.amount}>
						{Converter.cutCost(props.history.amount)}
					</div>
					<div className={styles.currency}>{props.history.currency}</div>
				</div>
				<div className={styles.date}>
					{Converter.getMiniDate(props.history.date)}
				</div>
			</div>
			<div
				className={styles.button_status}
				style={{
					background: getBackgroundColor(),
					color: getColor(),
					cursor: 'pointer',
				}}
			>
				{getStatus()}
			</div>
		</div>
	)
}

export default React.memo(Payment)
