import React, { useState } from 'react'
import { OpeningsHistory } from '../../../components/openings-history'
import { Loading } from '../../../components/сommon/button'

const BoxContent = (props) => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className='box-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">История открытия кейсов:</div>
					</div>
				</div>
				<div className="profile-delimiter"></div>
				<OpeningsHistory
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
			</div>
		</div>
	)
}

export default BoxContent