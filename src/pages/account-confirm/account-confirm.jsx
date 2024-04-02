import { React, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Email as EmailApi } from '../../api'
import { Handler } from '../../helpers/handler'
import TokenService from '../../services/token'
import styles from './account-confirm.module'

const AccountConfirm = () => {
	const emailApi = new EmailApi()
	const navigate = useNavigate()

	const [searchParams] = useSearchParams()
	const [errorMessage, setErrorMessage] = useState()
	const [isStart, setIsStart] = useState(true)

	const isAuth = () => TokenService.getAccessToken()

	useEffect(() => {
		const interval = setInterval(
			async () => {
				if (isStart && !isAuth()) {
					setIsStart(false)

					await Handler.error(async () => {
						const token = searchParams.get('token')

						if (token) {
							await emailApi.confirmAccount(searchParams.get('token'))
							setErrorMessage()
						} else {
							setErrorMessage('Токен не валидный, повторите все еще раз')
						}
					})
				}
			},
			isStart ? 100 : 10000
		)
		localStorage.removeItem('cred')
		return () => clearInterval(interval)
		
	})

	return (
		<div className={styles.account_confirm}>
			<Helmet>
				<title>InCase - Подтверждение аккаунта</title>
				<meta
					name='description'
					content='InCase подтвердите аккаунт и будьте уверены, мы лучший сайт по открытию кейсов cs go, dota 2.'
				/>
				<meta name='robots' content='noindex' />
			</Helmet>
			{errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
			{!errorMessage && !isAuth() ? (
				<div className={styles.tittle}>Успешно произведен вход в аккаунт</div>
			) : null}
			<div className={styles.button_back} onClick={() => navigate('/#')}>
				На главную
			</div>
		</div>
	)
}

export default AccountConfirm
