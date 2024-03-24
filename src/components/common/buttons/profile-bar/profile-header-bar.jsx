import React from 'react'
import { TemplateUser as UserImage } from '../../../../assets/images/main'
import styles from './profile-bar.module'

const ProfileHeaderBar = props => {
	const getClassName = () => {
		if (props.isMobile)
			return props.isActive
				? styles.profile_header_bar_mobile__active
				: styles.profile_header_bar_mobile
		else
			return props.isActive
				? styles.profile_header_bar__active
				: styles.profile_header_bar
	}

	return (
		<div className={getClassName()} onClick={props.click}>
			<img
				className={styles.image}
				alt=''
				src={props.user?.image ?? UserImage}
			/>
			<div className={styles.name}>{props.user?.login || ''}</div>
		</div>
	)
}

export default React.memo(ProfileHeaderBar)
