import React from 'react'
import { Helmet } from 'react-helmet'
import { Panel } from './components'
import styles from './profile.module'

const Profile = () => (
	<div className={styles.profile}>
		<Helmet>
			<title>InCase - Профиль</title>
			<meta name='robots' content='noindex' />
		</Helmet>
		<div className={styles.container}>
			<Panel />
		</div>
	</div>
)

export default Profile
