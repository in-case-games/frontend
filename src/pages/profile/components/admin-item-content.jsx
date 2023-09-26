import React, { useEffect, useState } from 'react'
import { AdminItems } from '../../../components/admin-items'
import { ItemWindow, LoadImageWindow, Modal } from '../../../components/modal'
import { InfoLine, Loading } from '../../../components/сommon/button'
import { Game as GameApi } from '../../../services/api'

const AdminItemContent = (props) => {
	const [games, setGames] = useState([])
	const [game, setGame] = useState("csgo")
	const [name, setName] = useState("")

	const [isLoading, setIsLoading] = useState(true)

	const [item, setItem] = useState(null)
	const [file, setFile] = useState()

	const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isLoading) {
				const gameApi = new GameApi()

				setGames(await gameApi.getGames())
			}
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className='admin-item-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<div className='profile-back' onClick={() => props.exchange("admin")}>←</div>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">Игровые предметы:</div>
					</div>
					<InfoLine
						value={name}
						setValue={value => {
							setName(value)
							setIsLoading(true)
						}}
						name="item-name"
						placeholder="Название"
						isReadOnly={false}
					/>
					<InfoLine
						value={game}
						setValue={value => {
							setGame(value)
							setIsLoading(true)
						}}
						name="item-game"
						placeholder="Игра"
						isReadOnly={false}
						comboBox={games}
					/>
					<div
						className="btn btn-create-item btn-withdraw"
						style={{ height: "28px", width: "180px" }}
						onClick={() => setItem({})}>
						Создать
					</div>
				</div>
				<div className="profile-delimiter"></div>
				{
					games.length > 0 ?
						<AdminItems
							isLoading={isLoading}
							setIsLoading={setIsLoading}
							setItem={setItem}
							getFilterGame={() => games.find(g => g.name === game)}
							getFilterName={() => name}
						/>
						: null
				}
			</div>
			<Modal
				active={item}
				clickChange={() => {
					setItem(null)
					setFile()
				}}
				content={
					<ItemWindow
						item={item}
						image={file}
						setImage={setFile}
						setItem={setItem}
						openLoadWindow={setIsOpenLoadWindow}
					/>
				}
			/>
			<Modal
				active={isOpenLoadWindow}
				clickChange={_ => setIsOpenLoadWindow(false)}
				content={
					<LoadImageWindow
						file={file}
						setFile={setFile}
						width={200}
						height={200}
						sizeMb={1}
						regular={/\.(png)$/}
						description={"PNG (MAX. 200x200px | 1MB)"}
					/>
				}
			/>
		</div>
	)
}

export default AdminItemContent