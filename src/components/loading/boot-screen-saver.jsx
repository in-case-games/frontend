import React from 'react'
import { LogoMen } from '../../assets/images/main'
import styles from './loading.module'

const BootScreenSaver = () => (
	<div className={styles.boot_screen_saver}>
		<div className={styles.screen_saver__inner}>
			<img alt='' src={LogoMen} className={styles.loading_static}></img>
		</div>
	</div>
)

export default React.memo(BootScreenSaver)
