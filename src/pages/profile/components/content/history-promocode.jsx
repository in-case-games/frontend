import React, { useState } from 'react'
import { User as UserApi } from '../../../../api'
import { AirplaneBlack as Airplane } from '../../../../assets/images/icons'
import { Input } from '../../../../components/common/inputs'
import { Promocode as History } from '../../../../components/history'
import { LoadingArrow as Loading } from '../../../../components/loading'
import { HistoryPromocode as HistoryPromocodeWindow } from '../../../../components/windows'
import { Handler } from '../../../../helpers/handler'
import {
	Inventory as InventoryLayout,
	Modal as ModalLayout,
} from '../../../../layouts'
import styles from './content.module'

const HistoryPromocode = () => {
	const userApi = new UserApi()

	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState()
	const [isApply, setIsApply] = useState(false)
	const [history, setHistory] = useState()
	const [name, setName] = useState()
	const [user, setUser] = useState()

	const additionalLoading = async (array, start, end) => {
		const loaded = []
		const u = user || (await loadedUser())

		for (let i = start; i < end; i++) {
			array[i].user = u
			loaded.push(array[i])
		}

		return loaded
	}

	const createShowByLoaded = (array, start, end) => {
		let result = []

		for (let j = start; j < end; j++) {
			const h = array[j]

			result.push(
				<History
					id={h.id}
					click={() => setHistory(h)}
					promocode={h}
					key={h.id}
				/>
			)
		}

		return result
	}

	const loadedUser = async () => {
		const user = await userApi.get()
		user.image = await userApi.getImage()

		setUser(user)

		return user
	}

	const click = async () => {
		setIsApply(false)
		setErrorMessage()

		await Handler.error(
			async () => {
				await userApi.activatePromocode(name)
				setIsApply(true)
			},
			async ex => {
				if (ex.response.data.error.code !== 4) {
					try {
						await userApi.exchangePromocode(name)
						setIsApply(true)
						setIsLoading(true)
					} catch (ex) {
						console.log(ex.response?.data?.error?.message)
						setErrorMessage(ex.response?.data?.error?.message)
					} finally {
						return true
					}
				}

				return false
			},
			setErrorMessage
		)
	}

	return (
		<div className={styles.history_promocode}>
			<div className={styles.profile_tittle}>
				<div className={styles.tittle}>
					<div className={styles.loading}>
						<Loading
							isLoading={isLoading}
							setLoading={() => setIsLoading(true)}
						/>
					</div>
					<div className={styles.name}>История промокодов </div>
				</div>
				<div className={styles.buttons}>
					<div className={styles.input}>
						<Input
							name='promocode-name'
							placeholder='Промокод'
							value={name}
							setValue={setName}
							isApply={isApply}
							isError={errorMessage}
						/>
					</div>
					<div className={styles.button_send} onClick={click}>
						<img alt='' src={Airplane} className={styles.image} />
						<div className={styles.text}>Применить</div>
					</div>
				</div>
			</div>
			<div className={styles.delimiter}></div>
			<div className={styles.inner}>
				<InventoryLayout
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					additionalLoading={additionalLoading}
					createShowByLoaded={createShowByLoaded}
					loadPrimary={userApi.getPromocodes}
					quantityPerPage={20}
				/>
			</div>
			<ModalLayout isActive={history} close={() => setHistory()}>
				<HistoryPromocodeWindow history={history} close={() => setHistory()} />
			</ModalLayout>
		</div>
	)
}

export default HistoryPromocode
