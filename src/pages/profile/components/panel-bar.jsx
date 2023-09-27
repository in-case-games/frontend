import React, { useEffect, useState } from 'react'
import { delete_cookie } from 'sfcookies'
import { UserLogo } from '../../../assets/images/additional'
import {
	ProfileBar as BarButton,
	ProfileHeaderBar as HeaderBarButton
} from "../../../components/сommon/button"
import { User } from '../../../services/api'
import TokenService from '../../../services/token'

const PanelBar = (props) => {
	const userApi = new User()
	const [isStart, setIsStart] = useState(true)
	const [user, setUser] = useState(TokenService.getUser())

	const handleClick = () => {
		TokenService.removeUser()
		setUser(null)
		delete_cookie("user-balance")
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			setIsStart(false)

			const temp = TokenService.getUser()
			temp.image = await userApi.getImage()

			setUser(temp)
		}, isStart ? 100 : 10000)

		return () => clearInterval(interval)
	})

	return (
		<div className='panel-bar'>
			<div className='user-bar'>
				<HeaderBarButton
					image={user?.image ?? UserLogo}
					name={user?.name ?? ""}
					click={() => props.exchange("profile")}
					active={props.active === "profile"}
				/>
				<BarButton
					text="Инвентарь"
					click={() => props.exchange("inventory")}
					active={props.active === "inventory"}
				/>
				<BarButton
					text="Открытые кейсы"
					click={() => props.exchange("box")}
					active={props.active === "box"}
				/>
				<BarButton
					text="Пополнения"
					click={() => props.exchange("payment")}
					active={props.active === "payment"}
				/>
				<BarButton
					text="Выводы"
					click={() => props.exchange("withdrawn")}
					active={props.active === "withdrawn"}
				/>
				<BarButton
					text="Промокоды"
					click={() => props.exchange("promo-code")}
					active={props.active === "promo-code"}
				/>
				{
					user && user.role === "owner" ?
						<BarButton
							text="Админ панель"
							click={() => props.exchange("admin")}
							active={props.active.split("-")[0] === "admin"}
						/> : null
				}
				<BarButton click={() => handleClick()} text="Выйти" />
			</div>
		</div>
	)
}

export default PanelBar