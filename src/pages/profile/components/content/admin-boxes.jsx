import React, { useEffect, useState } from 'react'
import { Box as BoxApi, Game as GameApi } from '../../../../api'
import { ComboBox, Input } from '../../../../components/common/inputs'
import { LoadingArrow as Loading } from '../../../../components/loading'
import { Simple as Box } from '../../../../components/loot-box'
import {
	Box as BoxWindow,
	LoadImage as LoadImageWindow,
} from '../../../../components/windows'
import { Handler } from '../../../../helpers/handler'
import {
	Inventory as InventoryLayout,
	Modal as ModalLayout,
} from '../../../../layouts'
import styles from './content.module'

const AdminBoxes = props => {
	const boxApi = new BoxApi()
	const gameApi = new GameApi()

	const [games, setGames] = useState()
	const [gamesArray, setGamesArray] = useState()

	const [isLoading, setIsLoading] = useState(true)
	const [isStart, setIsStart] = useState(true)
	const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)

	const [game, setGame] = useState('csgo')
	const [name, setName] = useState('')
	const [box, setBox] = useState()
	const [image, setImage] = useState()

	useEffect(() => {
		const interval = setInterval(
			async () =>
				await Handler.error(async () => {
					if (isStart) {
						setIsStart(false)
						await loadedGames()
					}
				}),
			isStart ? 50 : 5000
		)

		return () => clearInterval(interval)
	})

	const additionalLoading = async (array, start, end) => {
		const loaded = []

		for (let i = start; i < end; i++) {
			let b = array[i]
			b = await boxApi.pushImage(b)
			loaded.push(b)
		}

		return loaded
	}

	const createShowByLoaded = (array, start, end) => {
		let result = [
			<Box id='1213' box={{}} showBox={() => setBox({})} key='1213' />,
		]

		for (let j = start; j < end; j++) {
			const i = array[j]

			result.push(
				<Box id={i.id} box={i} showBox={() => setBox(i)} key={i.id} />
			)
		}

		return result
	}

	const loadedGames = async () => {
		const games = {}
		const response = await gameApi.get()

		for (let i = 0; i < response.length; i++) {
			games[response[i].name] = response[i].id
		}

		setGames(games)
		setGamesArray(response)

		return games
	}

	return (
		<div className={styles.admin_boxes}>
			<div className={styles.profile_tittle}>
				<div className={styles.tittle}>
					<div
						className={styles.profile_back}
						onClick={() => props.exchange('admin')}
					>
						←
					</div>
					<div className={styles.loading}>
						<Loading
							isLoading={isLoading}
							setLoading={() => setIsLoading(true)}
						/>
					</div>
					<div className={styles.name}>Игровые кейсы </div>
				</div>
				<div className={styles.input}>
					<Input
						name='box-name'
						placeholder='Название кейса'
						value={name}
						setValue={setName}
					/>
				</div>
				<div className={styles.filter}>
					<ComboBox
						name='filter'
						isReadOnly={isLoading}
						value={game}
						values={gamesArray}
						setValue={setGame}
					/>
				</div>
			</div>
			<div className={styles.delimiter}></div>
			<div className={styles.inner}>
				<InventoryLayout
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					additionalLoading={additionalLoading}
					createShowByLoaded={createShowByLoaded}
					loadPrimary={async () =>
						games ? await boxApi.getByGameId(games[game]) : []
					}
					filter={primary => {
						let res = primary

						if (name !== '')
							res = res?.filter(p =>
								p.name.toLowerCase().startsWith(name.toLowerCase())
							)

						return res
					}}
					filterName={game + name}
					quantityPerPage={19}
				/>
			</div>
			<ModalLayout
				isActive={box}
				close={() => {
					setBox()
					setImage()
				}}
			>
				<BoxWindow
					box={box}
					image={image}
					setImage={setImage}
					setBox={setBox}
					openLoadWindow={setIsOpenLoadWindow}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={isOpenLoadWindow}
				close={() => setIsOpenLoadWindow(false)}
			>
				<LoadImageWindow
					file={image}
					setFile={setImage}
					width={200}
					height={200}
					sizeMb={1}
					regular={/\.(png)$/}
					description={'PNG (MAX. 200x200px | 1MB)'}
				/>
			</ModalLayout>
		</div>
	)
}

export default AdminBoxes
