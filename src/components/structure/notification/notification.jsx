import React, { useEffect, useState } from 'react'
import Constants from '../../../constants'
import { Converter } from '../../../helpers/converter'
import styles from './notification.module'

const Notification = props => {
	const [isVisible, setIsVisible] = useState(
		Converter.getUtcDate() - 4000 <= props.utcDate
	)
	const [isNone, setIsNone] = useState(
		Converter.getUtcDate() - 4500 > props.utcDate
	)

	useEffect(() => {
		setTimeout(() => setIsVisible(false), 4000)
		setTimeout(() => setIsNone(true), 4500)
	})

	return (
		<div
			className={styles.notification}
			style={{
				background: Constants.NotifyBackgroundColors[props.status || 'red'],
				color: Constants.NotifyFontColors[props.status || 'red'],
				opacity: isVisible ? '1' : '0',
				display: isNone ? 'none' : 'flex',
			}}
			onClick={() => props.setIsNone()}
		>
			<div className={styles.header}>
				<div className={styles.code}>#{props.code}</div>
				<div className={styles.tittle}>{props.tittle}</div>
			</div>
			<div className={styles.content}>{props.content}</div>
			<div className={styles.footer}>{props.date}</div>
		</div>
	)
}

export default React.memo(Notification)
