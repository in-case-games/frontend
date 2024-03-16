import React from 'react'
import { Helmet } from 'react-helmet'
import styles from './not-found.module'

const NotFound = () => (
	<div className={styles.not_found}>
		<Helmet>
			<title>InCase - Страница не найдена</title>
			<meta name='robots' content='noindex' />
		</Helmet>
		<h1 className={styles.error_title}>
			Упс... Такой страницы не существует, возможно, вам и не нужно переходить
			по данной ссылке :)
		</h1>
	</div>
)

export default React.memo(NotFound)
