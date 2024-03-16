import React, { useState } from 'react'
import { Authentication as AuthApi } from '../../../api'
import { RegistrationMen } from '../../../assets/images/main'
import { Handler } from '../../../helpers/handler'
import { CheckBox, Input } from '../../common/inputs'
import styles from './sign-up.module'

const SignUp = props => {
	const authApi = new AuthApi()

	const [errorMessage, setErrorMessage] = useState()

	const [isAgree, setIsAgree] = useState(false)
	const [isLegalAge, setIsLegalAge] = useState(false)

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	const handleClick = async () => {
		if (!isAgree) setErrorMessage('Примите пользовательское соглашение')
		else if (!isLegalAge) setErrorMessage('Примите если вам есть 18 лет')
		else {
			await Handler.error(
				async () => {
					const response = await authApi.signUp(login, email, password)
					props.exchangeWindow('email')

					return response
				},
				undefined,
				setErrorMessage
			)
		}
	}

	return (
		<div className={styles.sign_up}>
			<div className={styles.sign_up_content}>
				<div className={styles.content_left}>
					<img alt='' src={RegistrationMen} />
				</div>
				<div className={styles.content_right}>
					<div className={styles.header}>
						<div className={styles.tittle}>Регистрация</div>
						<div className={styles.error}>{errorMessage}</div>
					</div>
					<div className={styles.inputs}>
						<Input
							name='account-login'
							placeholder='Имя аккаунта'
							value={login}
							setValue={setLogin}
						/>
						<Input
							name='account-email'
							placeholder='E-mail'
							value={email}
							setValue={setEmail}
							type='email'
						/>
						<Input
							name='account-password'
							placeholder='Пароль'
							value={password}
							setValue={setPassword}
							type='password'
						/>
					</div>
					<div className={styles.check_boxes}>
						<CheckBox
							name='agree-policy'
							subTittle='Я согласен с условиями пользовательского соглашения'
							link='info/user-agreement'
							value={isAgree}
							setValue={setIsAgree}
						/>
						<CheckBox
							name='agree-legal-age'
							subTittle='Подтверждаю, что мне есть 18 лет'
							link='info/user-agreement'
							value={isLegalAge}
							setValue={setIsLegalAge}
						/>
					</div>
					<div className={styles.buttons}>
						<div className={styles.button_send} onClick={handleClick}>
							Отправить
						</div>
						<div
							className={styles.button_back}
							onClick={() => props.exchangeWindow('sign_in')}
						>
							Войти в аккаунт
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp
