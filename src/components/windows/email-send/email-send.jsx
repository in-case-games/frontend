import React, { useState, useEffect } from 'react'
import { LoadingStatic as Loading } from '../../loading'
import { Handler } from '../../../helpers/handler'
import { Authentication as AuthApi } from '../../../api'
import styles from './email-send.module.scss'

const EmailSend = () => {
	const authApi = new AuthApi();

	const [errorMessage, setErrorMessage] = useState('');
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if(localStorage.getItem('user') == null){
			const buttonTimer = setTimeout(() => {
				setVisible(true);
			}, 30000);
	
			return () => { clearTimeout(buttonTimer) };
		}
	}, [])

	const signIn = async () => 
		await Handler.error(
			async () => {
				const credentials = JSON.parse(localStorage.getItem('cred'));
				const response = await authApi.signIn(credentials.login, credentials.password);
				return response.data;
			},
			undefined,
			setErrorMessage
		)

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
				{visible && <div className={`${styles.button_send}`} onClick={signIn}>Отправить повторно</div>}
			</div>
		</div>
	)
}

export default EmailSend
