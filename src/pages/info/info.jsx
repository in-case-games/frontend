import React from 'react'
import { Helmet } from 'react-helmet'
import { Panel as InfoPanel } from './components'
import styles from './info.module'

const Info = () => (
	<div className={styles.info}>
		<Helmet>
			<title>InCase - Информация</title>
			<meta
				name='description'
				content='InCase информация для клиентов и гостей, ознакомьтесь, наша политика современна и справедлива. По любым вопросам обращаться в наши соц.сети.'
			/>
		</Helmet>
		<div className={styles.container_small}>
			<InfoPanel />
		</div>
	</div>
)

export default Info
