import React from 'react'
import { UserLogo } from '../../../assets/images/additional'
import TokenService from '../../../services/token'

const ProfileHeaderBar = (props) => {
		const className = props.active ? 'btn btn-profile-header--active' : 'btn btn-profile-header';

		return(
				<div className={className} onClick={props.click}>
						<img className='profile-logo' alt="" src={UserLogo} href="#"></img>
						<div className='profile-login'>{TokenService.getUser().name}</div>
				</div>
		);
};

export default ProfileHeaderBar;