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
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', () => setWidth(window.innerWidth))
		return () => {
			window.removeEventListener('resize', () => setWidth(window.innerWidth))
		}
	}, [])

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
				<Bar content={content} exchange={setContent} isMobile={width < 901} />
				<Content
					content={content}
					exchange={setContent}
					isMobile={width < 901}
				/>
			</div>
		) : (
			<div className={styles.message}>Вы не авторизованы</div>
		)
	}

	return getResult()
}

export default Panel
