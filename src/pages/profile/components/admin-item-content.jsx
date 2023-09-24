import React, { useState } from 'react'
import { AdminItems } from '../../../components/admin-items'
import { Loading } from '../../../components/сommon/button'

const AdminItemContent = (props) => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className='admin-item-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<div className='profile-back' onClick={() => props.exchange("admin")}>←</div>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">Игровые предметы:</div>
					</div>
				</div>
				<div className="profile-delimiter"></div>
				<AdminItems
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
			</div>
		</div>
	)
}

export default AdminItemContent