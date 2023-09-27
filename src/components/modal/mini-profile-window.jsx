import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { UserLogo } from '../../assets/images/additional'
import { LinkOrange } from '../../assets/images/icon'
import { User } from '../../services/api'
import TokenService from '../../services/token'
import Loading from '../сommon/button/loading'
import classes from "./modal.module.css"

const MiniProfileWindow = (props) => {
	const navigate = useNavigate()
	const userApi = new User()
	const [isLoading, setIsLoading] = useState(true)
	const [isAllRefresh, setIsAllRefresh] = useState(true)
	const [isStart, setIsStart] = useState(true)
	const [user, setUser] = useState(null)

	const getDate = (date) => {
		if (date === null) return "Без даты"

		var d = new Date(date)
		var temp = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
			d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

		return temp
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isAllRefresh) {
				setIsAllRefresh(false)

				const tempUser = await userApi.getUserById(props.userId)
				tempUser.image = await userApi.getImageById(tempUser.id)

				console.log(tempUser)

				setUser(tempUser)

				setIsLoading(false)
				setIsStart(false)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={classes.mini_profile_window}>
			<div className={classes.mini_profile_content}>
				{
					isStart || user === null ?
						<Loading isLoading={isLoading} click={() => { }} /> :
						<div className={classes.mini_profile_load}>
							<div className={classes.mini_profile_tittle}>
								<div className={classes.mini_profile_info}>
									<img className={classes.mini_profile_logo} alt="" src={user?.image ?? UserLogo} />
									<div className={classes.mini_profile_main_info}>
										<div className={classes.mini_profile_name}>
											{user.login}
											<img
												alt=""
												src={LinkOrange}
												onClick={() => {
													if (TokenService.getUser()?.id === props.userId) {
														navigate("/profile")
														props.closeWindow()
													}
													else {
														navigate(`/profile/${user.id}`)
														props.closeWindow()
													}
												}} />
										</div>
										<div className={classes.mini_profile_role}>
											Роль:
											{user.additionalInfo.role.name}
										</div>
										<div className={classes.mini_profile_creation}>
											Создан:
											{getDate(user.additionalInfo.creationDate)}
										</div>
										<div className={classes.mini_profile_deletion}>
											Будет удален:
											{getDate(user.additionalInfo.deletionDate)}
										</div>
									</div>
								</div>
								<div className={classes.info_loading}>
									<Loading isLoading={isLoading} click={() => {
										setIsLoading(true)
										setIsAllRefresh(true)
									}} />
								</div>
							</div>
							<div className={classes.delimiter}></div>
							<div className={classes.mini_profile_items}>
							</div>
						</div>
				}
			</div>
		</div>
	)
}

export default MiniProfileWindow