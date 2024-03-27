import React from 'react'
import styles from '../../info.module'
import { CookiePolicy, UserAgreement } from '../content'

const Content = props => (
	<div className={styles.panel_content}>
		{props.content !== 'cookie-policy' ? <UserAgreement /> : null}
		{props.content === 'cookie-policy' ? <CookiePolicy /> : null}
	</div>
)

export default React.memo(Content)
