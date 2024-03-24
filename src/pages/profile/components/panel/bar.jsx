import React, { useEffect, useState } from 'react'
import { delete_cookie } from 'sfcookies'
import {
	ProfileBar as BarButton,
	ProfileHeaderBar as HeaderBarButton,
} from '../../../../components/common/buttons'
import TokenService from '../../../../services/token'
import styles from '../../profile.module'

const Bar = props => {
	const [isStart, setIsStart] = useState(true)
	const [user, setUser] = useState(TokenService.getUser())

	const exit = () => {
		TokenService.removeUser()
		setUser(null)
		delete_cookie('user-balance')
	}

	useEffect(() => {
		const interval = setInterval(
			async () => {
				setIsStart(false)

				const temp = TokenService.getUser()

				setUser(temp)
			},
			isStart ? 100 : 10000
		)

		return () => clearInterval(interval)
	})

	return (
		<div
			className={props.isMobile ? styles.panel_bar_mobile : styles.panel_bar}
		>
			<HeaderBarButton
				user={user}
				click={() => props.exchange('profile')}
				isActive={props.content === 'profile'}
				isMobile={props.isMobile}
			/>
			<BarButton
				text='Инвентарь'
				click={() => props.exchange('inventory')}
				isActive={props.content === 'inventory'}
				isMobile={props.isMobile}
			/>
			<BarButton
				text='Открытые кейсы'
				click={() => props.exchange('history_opening')}
				isActive={props.content === 'history_opening'}
				isMobile={props.isMobile}
			/>
			<BarButton
				text='Пополнения'
				click={() => props.exchange('payment')}
				isActive={props.content === 'payment'}
				isMobile={props.isMobile}
			/>
			<BarButton
				text='Выводы'
				click={() => props.exchange('withdrawn')}
				isActive={props.content === 'withdrawn'}
				isMobile={props.isMobile}
			/>
			<BarButton
				text='Промокоды'
				click={() => props.exchange('promocode')}
				isActive={props.content === 'promocode'}
				isMobile={props.isMobile}
			/>
			{user && user.role === 'owner' ? (
				<BarButton
					text='Админ панель'
					click={() => props.exchange('admin')}
					isActive={props.content.split('_')[0] === 'admin'}
					isMobile={props.isMobile}
				/>
			) : null}
			<BarButton click={exit} text='Выйти' isMobile={props.isMobile} />
		</div>
	)
}

export default Bar
