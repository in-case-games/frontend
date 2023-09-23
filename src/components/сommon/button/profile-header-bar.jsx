import React from 'react'

const ProfileHeaderBar = (props) => {
	const className = props.active ? 'btn btn-profile-header--active' : 'btn btn-profile-header'

	return (
		<div className={className} onClick={props.click}>
			<img className='profile-logo' alt="" src={props.img} href="#" />
			<div className='profile-login'>{props.name}</div>
		</div>
	)
}

export default ProfileHeaderBar