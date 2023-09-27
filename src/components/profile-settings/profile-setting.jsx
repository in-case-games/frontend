import React, { useEffect, useState } from 'react'
import { CSGO, Dota2, UserLogo } from '../../assets/images/additional'
import {
	ArrowGrayBottom, BookUser,
	CrossBlack, Download, Email, Pen
} from '../../assets/images/icon'
import { User } from '../../services/api'
import TokenService from "../../services/token"
import { GameProfile } from '../game'
import { MiniProfileWindow, Modal, TradeUrlChangeWindow } from "../modal"
import { Restriction } from '../restriction'
import { MiniRetractable } from '../сommon/button'
import Loading from '../сommon/button/loading'
import InputData from './components/input-data'
import classes from "./profile-setting.module.css"

const ProfileSetting = (props) => {
	const userApi = new User()

	const [user, setUser] = useState(TokenService.getUser())
	const [game, setGame] = useState(null)
	const [showGames, setShowGames] = useState(false)
	const [showRestriction, setShowRestriction] = useState(false)
	const [restrictions, setRestrictions] = useState(null)
	const [miniProfile, setMiniProfile] = useState(null)

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
			if ((showRestriction && !restrictions) || (props.isLoading && showRestriction)) {
				let temp = []

				try {
					Array.prototype.push.apply(temp, await userApi.getRestrictionsByOwner())
				}
				catch (err) { }

				Array.prototype.push.apply(temp, await userApi.getRestrictions())

				setRestrictions(temp)
			}
			if (props.isLoading) {
				const temp = TokenService.getUser()
				temp.image = await userApi.getImage()

				setUser(temp)
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
						<img className={classes.user_logo} alt="" src={user?.image ?? UserLogo} />
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
				{
					showGames ?
						"Нажмите на игру, чтобы изменить ссылку на обмен" :
						"Нажмите на стрелку, чтобы показать игры"
				}
			</div>
			<div className={classes.setting_line} style={{ justifyContent: showGames ? 'space-between' : "center" }}>
				{
					showGames ?
						<div className={classes.game_profile}>
							{
								games?.map(game =>
									<GameProfile game={game} key={game.id} click={() => setGame(game)} />)
							}
						</div> :
						<img
							alt=""
							className={classes.setting_line_arrow}
							src={ArrowGrayBottom}
							onClick={() => setShowGames(true)}
						/>
				}
			</div>
			<div className={classes.line_tittle}>
				{
					showRestriction ?
						"История ограничений" :
						"Нажмите на стрелку, чтобы показать историю ограничений"
				}
			</div>
			<div className={classes.setting_line} style={{ justifyContent: showRestriction && restrictions ? 'space-between' : "center" }}>
				{
					showRestriction ?
						<div className={classes.profile_restrictions} style={{ alignItems: restrictions ? 'flex-start' : "center" }}>
							{
								restrictions ?
									restrictions.map(r => <Restriction restriction={r} key={r.id} showMiniProfile={() => setMiniProfile(r.ownerId)} />) :
									<Loading isLoading={!restrictions} click={() => { }} />
							}
						</div> :
						<img
							alt=""
							className={classes.setting_line_arrow}
							src={ArrowGrayBottom}
							onClick={() => setShowRestriction(true)}
						/>
				}
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
			<Modal
				active={miniProfile}
				clickChange={() => setMiniProfile(null)}
				content={
					<MiniProfileWindow
						userId={miniProfile}
						closeWindow={() => setMiniProfile(null)}
					/>
				}
			/>
		</div>
	)
}

export default ProfileSetting