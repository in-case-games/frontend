import React, { useState } from 'react'
import { WithdrawnItemsHistory } from '../../../components/withdrawn-items-history'
import { Loading } from '../../../components/сommon/button'

const WithdrawnContent = () => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className='withdrawn-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">Выведенные предметы:</div>
					</div>
				</div>
				<div className="profile-delimiter"></div>
			</div>
			<WithdrawnItemsHistory
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</div>
	)
}

export default WithdrawnContent