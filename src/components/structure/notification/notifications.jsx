import React, { useEffect, useState } from 'react'
import { Converter } from '../../../helpers/converter'
import { Notification as NotificationService } from '../../../services/notification'
import Notification from './notification'
import styles from './notification.module'

const Notifications = () => {
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		const interval = setInterval(
			() =>
				setNotifications(
					notifications
						.concat(NotificationService.popNotifies())
						.filter(e => e.utcDate >= Converter.getUtcDate() - 4500)
				),
			100
		)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.notifications}>
			{notifications.map(n => (
				<Notification
					id={n.id}
					tittle={n.tittle}
					content={n.content}
					date={n.date}
					utcDate={n.utcDate}
					status={n.status}
					code={n.code}
					setIsNone={id => {
						const index = notifications.findIndex(e => e.id === id)
						const temp = notifications
						temp.splice(index, 1)

						setNotifications(temp)
					}}
					key={n.id}
				/>
			))}
		</div>
	)
}

export default React.memo(Notifications)
