import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { User as UserApi } from '../../../../api'
import { LoadingArrow as Loading } from '../../../../components/loading'
import { Observed as ProfileSettings } from '../../../../components/profile-settings'
import { LoadImage as LoadImageWindow } from '../../../../components/windows'
import { Handler } from '../../../../helpers/handler'
import { Modal as ModalLayout } from '../../../../layouts'
import styles from './content.module'

const ObservedProfile = () => {
	const userApi = new UserApi()

	const { id } = useParams()
	const navigate = useNavigate()

	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isAllReload, setIsAllReload] = useState(true)
	const [isLoadImage, setIsLoadImage] = useState(false)

	const [image, setImage] = useState(null)
	const [penaltyDelay, setPenaltyDelay] = useState(0)

	useEffect(() => {
		const func = async () =>
			await Handler.error(
				async () => {
					const temp = await userApi.getById(id)
					temp.image = await userApi.getImageByUserId(id)
					setUser(temp)
					setIsAllReload(true)
					setIsLoading(true)
				},
				async ex => {
					if (ex?.response?.status === 404) navigate('/not-found')

					return false
				},
				undefined,
				penaltyDelay,
				setPenaltyDelay
			)

		func()
	}, [id])

	useEffect(() => {
		const interval = setInterval(
			async () =>
				await Handler.error(
					async () => {
						if (!user) {
							const temp = await userApi.getById(id)
							temp.image = await userApi.getImageByUserId(id)

							setUser(temp)
						}
					},
					async () => {
						if (ex?.response?.status === 404) navigate('/not-found')

						return false
					},
					undefined,
					penaltyDelay,
					setPenaltyDelay
				),
			100 + penaltyDelay
		)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.observed_profile}>
			<div className={styles.profile_tittle}>
				<div className={styles.tittle}>
					<div className={styles.loading}>
						<Loading
							isLoading={isLoading}
							setLoading={() => setIsLoading(true)}
						/>
					</div>
					<div className={styles.name}>Профиль пользователя</div>
				</div>
			</div>
			<div className={styles.delimiter}></div>
			<div className={styles.inner}>
				{user ? (
					<ProfileSettings
						user={user}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						isAllReload={isAllReload}
						setIsAllReload={setIsAllReload}
						showLoadImage={setIsLoadImage}
					/>
				) : null}
			</div>
			<ModalLayout isActive={isLoadImage} close={() => setIsLoadImage(false)}>
				<LoadImageWindow
					file={image}
					setFile={setImage}
					width={400}
					height={400}
					sizeMb={1}
					regular={/\.(jpg|jpeg|png)$/}
					description={'JPG, JPEG, PNG (MAX. 400x400px | 1MB)'}
					click={async () => {
						if (image) {
							await userApi.updateImageByAdmin(id, image)
							window.location.reload()
						}
					}}
				/>
			</ModalLayout>
		</div>
	)
}

export default ObservedProfile
