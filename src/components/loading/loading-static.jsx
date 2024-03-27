import React from 'react'
import { LogoMen } from '../../assets/images/main'
import styles from './loading.module.scss'

const LoadingStatic = () => (
	<div className={styles.loading}>
		<img alt='' src={LogoMen} className={styles.loading_static}></img>
	</div>
)

export default React.memo(LoadingStatic)
