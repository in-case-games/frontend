import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { delete_cookie } from 'sfcookies'
import { Email as EmailApi } from '../../api'
import { Input } from '../../components/common/inputs'
import { Handler } from '../../helpers/handler'
import TokenService from '../../services/token'
import styles from './account-change-password.module'

const AccountChangePassword = () => {
	const emailApi = new EmailApi()

	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const [isSuccess, setIsSuccess] = useState(false)

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const handleClick = async () => {
		if (isSuccess) navigate('/#')

		await Handler.error(async () => {
			const token = searchParams.get('token')

			if (!token) {
				setErrorMessage('Токен не валидный, повторите все еще раз')
			} else if (password === '' || confirmPassword === '') {
				setErrorMessage('Заполните все поля')
			} else if (password !== confirmPassword) {
				setErrorMessage('Пароли не сходятся, скорее всего допустили ошибку')
			} else {
				await emailApi.confirmPassword(password, token)
				TokenService.removeUser()
				delete_cookie('user-balance')
				setIsSuccess(true)
			}

			setErrorMessage()
		})
	}

	return (
		<div className={styles.account_change_password}>
			<Helmet>
				<title>InCase - Смена пароля</title>
				<meta
					name='description'
					content='InCase поменяем ваш пароль на другую. Будьте уверены мы сделаем все качественно, открывайте кейсы и оставьте все хлопоты на нас.'
				/>
				<meta name='robots' content='noindex' />
			</Helmet>
			<div className={styles.tittle}>
				{!isSuccess ? 'Подтвердите новый пароль' : 'Ваш аккаунт сменил пароль'}
			</div>
			{errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}
			{!isSuccess ? (
				<div className={styles.inputs}>
					<Input
						name='account-password'
						placeholder='Пароль'
						value={password}
						setValue={setPassword}
						type='password'
					/>
					<Input
						name='account-confirm-password'
						placeholder='Подтвердите пароль'
						value={confirmPassword}
						setValue={setConfirmPassword}
						type='password'
					/>
				</div>
			) : null}
			<div className={styles.button_main} onClick={() => handleClick()}>
				{!isSuccess ? 'Отправить' : 'На главную'}
			</div>
		</div>
	)
}

export default AccountChangePassword
