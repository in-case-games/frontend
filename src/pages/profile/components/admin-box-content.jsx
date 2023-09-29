import React, { useEffect, useState } from 'react'
import { AdminBoxes } from '../../../components/admin-boxes'
import { BoxWindow, LoadImageWindow, Modal } from '../../../components/modal'
import { InfoLine, Loading } from '../../../components/сommon/button'
import { Game as GameApi } from '../../../services/api'

const AdminBoxContent = (props) => {
	const [games, setGames] = useState([])
	const [game, setGame] = useState("csgo")
	const [name, setName] = useState("")

	const [isLoading, setIsLoading] = useState(true)

	const [box, setBox] = useState(null)
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
		<div className='admin-box-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<div className='profile-back' onClick={() => props.exchange("admin")}>←</div>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">Игровые кейсы:</div>
					</div>
					<InfoLine
						value={name}
						setValue={value => {
							setName(value)
							setIsLoading(true)
						}}
						name="box-name"
						placeholder="Название"
						isReadOnly={false}
					/>
					<InfoLine
						value={game}
						setValue={value => {
							setGame(value)
							setIsLoading(true)
						}}
						name="box-game"
						placeholder="Игра"
						isReadOnly={false}
						comboBox={games}
					/>
					<div
						className="btn btn-create-item btn-withdraw"
						style={{ height: "28px", width: "180px" }}
						onClick={() => setBox({})}>
						Создать
					</div>
				</div>
				<div className="profile-delimiter"></div>
				{
					games.length > 0 ?
						<AdminBoxes
							isLoading={isLoading}
							setIsLoading={setIsLoading}
							setBox={setBox}
							getFilterGame={() => games.find(g => g.name === game)}
							getFilterName={() => name}
						/>
						: null
				}
			</div>
			<Modal
				active={box}
				clickChange={() => {
					setBox(null)
					setFile()
				}}
				content={
					<BoxWindow
						box={box}
						image={file}
						setImage={setFile}
						setBox={setBox}
						resetImage={() => setFile()}
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

export default AdminBoxContent