import React, { useState } from 'react'
import { AdminItems } from '../../../components/admin-items'
import { ItemWindow, LoadImageWindow, Modal } from '../../../components/modal'
import { Loading } from '../../../components/сommon/button'

const AdminItemContent = (props) => {
	const [isLoading, setIsLoading] = useState(true)

	const [item, setItem] = useState(null)
	const [file, setFile] = useState()

	const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)

	return (
		<div className='admin-item-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<div className='profile-back' onClick={() => props.exchange("admin")}>←</div>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">Игровые предметы:</div>
					</div>
					<div
						className="btn btn-create-item btn-withdraw"
						style={{ height: "28px", width: "180px" }}
						onClick={() => setItem({})}>Создать</div>
				</div>
				<div className="profile-delimiter"></div>
				<AdminItems
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					setItem={setItem}
				/>
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