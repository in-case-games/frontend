import React from 'react'

const ProfileBar = (props) => {
		const className = props.active ? 'btn btn-profile--active' : 'btn btn-profile';

		return(
				<div className={className} onClick={props.click}>
						{props.text}
				</div>
		);
};

export default ProfileBar;