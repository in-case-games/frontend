import React from 'react'
import styles from './profile-bar.module'

const ProfileBar = props => {
	const getClassName = () => {
		if (props.isMobile)
			return props.isActive
				? styles.profile_bar_mobile__active
				: styles.profile_bar_mobile
		else return props.isActive ? styles.profile_bar__active : styles.profile_bar
	}

	return (
		<div className={getClassName()} onClick={props.click}>
			{props.text}
		</div>
	)
}

export default React.memo(ProfileBar)
