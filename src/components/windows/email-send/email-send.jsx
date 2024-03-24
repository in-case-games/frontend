import React from 'react'
import { LoadingStatic as Loading } from '../../loading'
import styles from './email-send.module.scss'

const EmailSend = () => {
	return (
		<div className={styles.send_email}>
			<div className={styles.send_email_content}>
				<div className={styles.tittle}>InCase</div>
				<div className={styles.description}>
					Вам на почту отправлено сообщение. Зайдите и проверьте, возможно
					письмо попало в спам
				</div>
				<div
					className={styles.loading}
					style={{ maxHeight: '120px', width: '90px' }}
				>
					<Loading />
				</div>
			</div>
		</div>
	)
}

export default EmailSend
