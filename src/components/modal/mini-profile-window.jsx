import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { UserLogo } from '../../assets/images/additional'
import { AccountOrange, BoxOrange, Gun, LinkOrange } from '../../assets/images/icon'
import { Box as BoxApi, Item as ItemApi, User as UserApi } from '../../services/api'
import { SmallItem } from '../item'
import { LootBoxSmall } from '../loot-box'
import { Restriction } from '../restriction'
import Loading from '../сommon/button/loading'
import classes from "./modal.module.css"

const MiniProfileWindow = (props) => {
	const navigate = useNavigate()
	const userApi = new UserApi()
	const itemApi = new ItemApi()
	const boxApi = new BoxApi()

	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingItems, setIsLoadingItems] = useState(true)
	const [isAllRefresh, setIsAllRefresh] = useState(true)
	const [isStart, setIsStart] = useState(true)

	const [user, setUser] = useState(null)
	const [historyOpening, setHistoryOpening] = useState(null)
	const [restrictions, setRestrictions] = useState(null)

	const [showItem, setShowItem] = useState(false)
	const [showBox, setShowBox] = useState(false)
	const [showRestriction, setShowRestriction] = useState(false)

	const setBarActive = (action) => {
		setShowItem(false)
		setShowBox(false)
		setShowRestriction(false)

		action()
	}

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

				tempUser.ownerRestrictions = tempUser.ownerRestrictions.slice(0, 3)
				tempUser.restrictions = tempUser.restrictions.slice(0, 3)

				if (tempUser) {
					const role = tempUser.additionalInfo.role.name
					const restrictionTemp = role === "user" ? tempUser.restrictions : tempUser.ownerRestrictions

					setRestrictions(restrictionTemp.map(r =>
						<Restriction
							restriction={r}
							showMiniProfile={() => {
								const id = role === "user" ? r.ownerId : r.userId

								props.exchangeWindow(id)
								setHistoryOpening(null)
								setRestrictions(null)
								setIsLoading(true)
								setIsAllRefresh(true)
							}}
							isOwnerImage={role === "user"}
							key={r.id}
						/>))
				}
				if (tempUser && historyOpening && (showItem || showBox)) {
					let temp = await userApi.getBoxOpeningsByUserId(props.userId)
					temp = temp.slice(0, 15)

					for (let i = 0; i < temp.length; i++) {
						if (showBox) {
							let box = await boxApi.getBox(temp[i].boxId)
							temp[i].box = await boxApi.pullBoxWithImage(box)
						}
						else if (showItem) {
							let item = await itemApi.getItem(temp[i].itemId)
							temp[i].item = await itemApi.pullItemWithImage(item)
						}
					}

					setHistoryOpening(temp)
				}

				setUser(tempUser)
				setIsLoading(false)
				setIsLoadingItems(false)
				setIsStart(false)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	const firstLoadHistory = async (showData) => {
		if (showData === "item") setBarActive(() => setShowItem(!showItem))
		else if (showData === "box") setBarActive(() => setShowBox(!showBox))

		if ((showData === "item" && (!historyOpening || !historyOpening[0]?.item)) ||
			(showData === "box" && (!historyOpening || !historyOpening[0]?.box))) {
			let temp = !historyOpening ? await userApi.getBoxOpeningsByUserId(props.userId) : historyOpening
			temp = temp.slice(0, 15)

			for (let i = 0; i < temp.length; i++) {
				if (showData === "box") {
					let box = await boxApi.getBox(temp[i].boxId)
					temp[i].box = await boxApi.pullBoxWithImage(box)
				}
				else if (showData === "item") {
					let item = await itemApi.getItem(temp[i].itemId)
					temp[i].item = await itemApi.pullItemWithImage(item)
				}
			}

			setHistoryOpening(temp)
		}

		setIsLoadingItems(false)
	}

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
													navigate(`/profile/${user.id}`)
													props.exchangeWindow(null)
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
							<div className={classes.mini_profile_bar}>
								<img
									alt=""
									src={Gun}
									className={classes.mini_profile_item}
									style={{ background: showItem ? 'transparent' : "#313138" }}
									onClick={async () => {
										setIsLoadingItems(true)
										await firstLoadHistory("item")
									}}
								/>
								<img
									alt=""
									src={BoxOrange}
									className={classes.mini_profile_box}
									style={{ background: showBox ? 'transparent' : "#313138" }}
									onClick={async () => {
										setIsLoadingItems(true)
										await firstLoadHistory("box")
									}}
								/>
								<img
									alt=""
									src={AccountOrange}
									className={classes.mini_profile_restriction}
									style={{ background: showRestriction ? 'transparent' : "#313138" }}
									onClick={() => {
										setBarActive(() => setShowRestriction(restrictions && !showRestriction))
									}
									}
								/>
							</div>
							<div className={classes.mini_profile_items}>
								{
									restrictions && showRestriction ? restrictions : null
								}
								{
									isLoadingItems ?
										<Loading isLoading={isLoadingItems} click={() => { }} /> : null
								}
								{
									historyOpening && historyOpening[0]?.box && showBox ?
										historyOpening.map(h =>
											<LootBoxSmall
												box={h.box}
												showBox={() => navigate(`/box/${h.box.id}`)}
												key={h.id}
											/>) : null
								}
								{
									historyOpening && historyOpening[0]?.item && showItem ?
										historyOpening.map(h =>
											<SmallItem
												item={h.item}
												showItem={() => props.openItemWindow(h.item)}
												key={h.id} />) : null
								}
							</div>
							{
								showBox || showRestriction || showItem ?
									<div className={classes.delimiter}></div> : null
							}
						</div>
				}
			</div>
		</div>
	)
}

export default MiniProfileWindow