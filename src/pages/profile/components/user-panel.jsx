import React, { useEffect, useState } from 'react'
import TokenService from '../../../services/token'
import PanelBar from './panel-bar'
import PanelContent from './panel-content'

const UserPanel = () => {
	const [content, setContent] = useState("profile")
	const [show, setShow] = useState(null)

	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				setShow(TokenService.getExpiresAccessToken())
			}
			catch (err) {
				setShow(false)
			}
		}, (10))

		return () => {
			clearInterval(interval)
		}
	})

	const userPanel = () => {
		if (show === null) return (null)

		return (show ?
			<div className='user-panel'>
				<PanelBar exchange={setContent} active={content} />
				<PanelContent exchange={setContent} active={content} />
			</div> :
			<div>Вы не авторизованы</div>)
	}

	return (userPanel())
}

export default UserPanel