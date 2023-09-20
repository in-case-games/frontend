import React, { useState } from 'react'
import { AirPlaneBlack, CrossBlack } from '../../../assets/images/icon'
import { EmailSendWindow, LoadImageWindow, Modal } from '../../../components/modal'
import { ProfileSetting } from "../../../components/profile-settings"
import { Loading } from '../../../components/сommon/button'
import { Email } from '../../../services/api'

const ProfileContent = (props) => {
	const emailApi = new Email()

	const [isLoading, setIsLoading] = useState(true)
	const [emailActive, setEmailActive] = useState(false)
	const [loadImageActive, setLoadImageActive] = useState(false)

	const [file, setFile] = useState()
	const [password, setPassword] = useState("")

	const [controllerConfirmEmail, setControllerConfirmEmail] = useState(null)
	const [passwordError, setPasswordError] = useState(false)

	const controllersConfirmEmail = {
		"email": async () => await emailApi.sendChangeEmail(password),
		"login": async () => await emailApi.sendChangeLogin(password),
		"password": async () => await emailApi.sendChangePassword(password),
		"account_delete": async () => await emailApi.sendDeleteAccount(password)
	}

	const translateNameController = {
		"email": "Пароль для смены почты:",
		"login": "Пароль для смены логина:",
		"password": "Пароль для смены пароля:",
		"account_delete": "Пароль для удаления аккаунта:"
	}

	const active = {
		"load-image": () => setLoadImageActive(true),
		"email": () => setEmailActive(true),
		"close": () => {
			setEmailActive(false)
			setLoadImageActive(false)
		}
	}

	const listActive = {
		"email": () => emailActive,
		"load-image": () => loadImageActive
	}

	const isActive = (name) => listActive[name]()

	const exchangeModal = (modal) => {
		setEmailActive(false)
		setLoadImageActive(false)

		active[modal]()
	}

	return (
		<div className='profile-content'>
			<div className="profile-header">
				<div className="profile-tittle">
					<div className='profile-group'>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">Мой профиль:</div>
					</div>
					{
						controllerConfirmEmail ?
							<div className='profile-input'>
								<div>{translateNameController[controllerConfirmEmail]}</div>
								<input
									maxLength={50}
									placeholder="Пароль"
									value={password}
									type='password'
									style={{ borderColor: passwordError ? "red" : "#F8B415" }}
									onInput={e => setPassword(e.target.value)}
									name="password"
								/>
								<img
									alt=''
									src={AirPlaneBlack}
									onClick={async _ => {
										try {
											await controllersConfirmEmail[controllerConfirmEmail]()
											exchangeModal("email")
										}
										catch (err) {
											console.log(err)
											setPasswordError(true)
										}
									}}
								/>
								<img
									alt=''
									src={CrossBlack}
									style={{ background: "red" }}
									onClick={_ => {
										setPassword(null)
										setControllerConfirmEmail(null)
										setPasswordError(false)
									}}
								/>
							</div> : null
					}
				</div>
				<div className="profile-delimiter"></div>
			</div>
			<ProfileSetting
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				exchangeModal={exchangeModal}
				setControllerConfirmEmail={setControllerConfirmEmail}
			/>
			{
				isActive("load-image") ?
					<Modal
						active={isActive("load-image")}
						clickChange={(active) => {
							exchangeModal(active)
							setIsLoading(true)
						}}
						content={
							<LoadImageWindow
								file={file}
								setFile={setFile}
								width={400}
								height={400}
								sizeMb={1}
								description={"JPG, JPEG, PNG (MAX. 400x400px | 1MB)"}
								click={_ => {
									console.log(file)
								}}
							/>
						}
					/> : null
			}
			{
				isActive("email") ?
					<Modal
						active={isActive("email")}
						clickChange={(active) => {
							exchangeModal(active)
							setIsLoading(true)
						}}
						content={<EmailSendWindow />}
					/> : null
			}
		</div>
	)
}

export default ProfileContent