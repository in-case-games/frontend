import React, { useEffect, useState } from 'react'
import { CSGO, Dota2 } from '../../assets/images/additional'
import { BookUser, CrossBlack, Download, Email, Pen } from '../../assets/images/icon'
import { User } from '../../services/api'
import TokenService from "../../services/token"
import { GameProfile } from '../game'
import { Modal, TradeUrlChangeWindow } from "../modal"
import { MiniRetractable } from '../сommon/button'
import InputData from './components/input-data'
import classes from "./profile-setting.module.css"

const ProfileSetting = (props) => {
	const userApi = new User()

	const [user, setUser] = useState(TokenService.getUser())
	const [game, setGame] = useState(null)
	const [img, setImg] = useState("")

	const games = [
		{
			id: 1,
			name: "csgo",
			nameTrade: "Ссылка на обмен",
			urlGetTrade: "https://steamcommunity.com/id/yt_ferbray/tradeoffers/privacy",
			image: CSGO
		},
		{
			id: 2,
			name: "dota2",
			nameTrade: "Ссылка на обмен",
			urlGetTrade: "https://steamcommunity.com/id/yt_ferbray/tradeoffers/privacy",
			image: Dota2
		}
	]

	useEffect(() => {
		const interval = setInterval(async () => {
			if (!props.isLoading) props.setIsLoading(true)
		}, 10000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (props.isLoading) {
				const logo = await userApi.getImage()
				setImg(logo)
				setUser(TokenService.getUser())
				props.setIsLoading(false)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.profile_setting}>
			<div className={classes.line_tittle}>
				Основные данные
			</div>
			<div className={classes.setting_line}>
				<div className={classes.setting_main}>
					<div className={classes.setting_img} onMouseDown={() => props.exchangeModal("load-image")}>
						<img className={classes.user_logo} alt="" src={img} />
						<img className={classes.load_icon} alt="" src={Download} />
					</div>
					<div className={classes.setting_data}>
						<InputData value={user.name} tittle="Логин:" />
						<InputData value={user.email} tittle="Почта:" />
						<InputData tittle="Роль:" value={user.role} />
					</div>
				</div>
				<div className={classes.setting_bar}>
					<MiniRetractable
						color="#EAA22F"
						image={BookUser}
						text="Изменить логин"
						click={_ => props.setControllerConfirmEmail("login")}
					/>
					<MiniRetractable
						color="#EAA22F"
						image={Email}
						text="Изменить почту"
						click={_ => props.setControllerConfirmEmail("email")}
					/>
					<MiniRetractable
						color="#EAA22F"
						image={Pen}
						text="Изменить пароль"
						click={_ => props.setControllerConfirmEmail("password")}
					/>
					<MiniRetractable
						color="red"
						image={CrossBlack}
						text="Удалить аккаунт"
						click={_ => props.setControllerConfirmEmail("account_delete")}
					/>
				</div>
			</div>
			<div className={classes.line_tittle}>
				Нажмите на игру, чтобы изменить ссылку на обмен
			</div>
			<div className={classes.setting_line}>
				<div className={classes.game_profile}>
					{
						games?.map(game =>
							<GameProfile game={game} key={game.id} click={() => setGame(game)} />)
					}
				</div>
			</div>
			<Modal
				active={game}
				clickChange={() => setGame(null)}
				content={
					<TradeUrlChangeWindow
						name={game?.name}
						nameTrade={game?.nameTrade}
						urlGetTrade={game?.urlGetTrade}
					/>
				}
			/>
		</div>
	)
}

export default ProfileSetting