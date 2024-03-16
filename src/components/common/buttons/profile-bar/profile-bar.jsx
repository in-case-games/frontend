import React from 'react'
import styles from './profile-bar.module'

const ProfileBar = props => (
	<div
		className={props.isActive ? styles.profile_bar__active : styles.profile_bar}
		onClick={props.click}
	>
		{props.text}
	</div>
)

export default React.memo(ProfileBar)
