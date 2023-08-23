import React from 'react'
import { read_cookie } from 'sfcookies'
import { UserLogo } from '../../../assets/images/additional'

const ProfileHeaderBar = (props) => {
	const className = props.active ? 'btn btn-profile-header--active' : 'btn btn-profile-header';

		return(
				<div className={className} onClick={props.click}>
						<img className='profile-logo' alt="" src={UserLogo} href="#"></img>
						<div className='profile-login'>{read_cookie("user-login")}</div>
				</div>
		);
};

export default ProfileHeaderBar;