import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, Content } from '.'
import TokenService from '../../../../services/token'
import styles from '../../profile.module'
import { ObservedProfile } from '../content'

const Panel = () => {
	const { id } = useParams()
	const [content, setContent] = useState('profile')
	const [show, setShow] = useState(null)

	useEffect(() => {
		const interval = setInterval(
			async () => setShow(TokenService.getExpiresAccessToken()),
			10
		)

		return () => {
			clearInterval(interval)
		}
	})

	const getResult = () => {
		if (id && id !== TokenService.getUser()?.id)
			return (
				<div className={styles.panel}>
					<ObservedProfile />
				</div>
			)

		return show ? (
			<div className={styles.panel}>
				<Bar content={content} exchange={setContent} />
				<Content content={content} exchange={setContent} />
			</div>
		) : (
			<div className={styles.message}>Вы не авторизованы</div>
		)
	}

	return getResult()
}

export default Panel
