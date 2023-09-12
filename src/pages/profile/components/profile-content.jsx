import React, { useState } from 'react'
import { ProfileSetting } from "../../../components/profile-settings"
import { Loading } from '../../../components/сommon/button'

const ProfileContent = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	
	return(
		<div className='profile-content'>
				<div className="profile-header">
						<div className="profile-tittle">
								<div className='profile-group'>
										<Loading isLoading={isLoading} click={() => setIsLoading(true)}/>
										<div className="profile-name">Мой профиль:</div>
								</div>
						</div>
						<div className="profile-delimiter"></div>
						<ProfileSetting
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
				</div>
		</div>
	);
};

export default ProfileContent;