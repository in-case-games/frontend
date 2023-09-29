import React, { useEffect, useState } from 'react'
import { UserLogo } from '../../assets/images/additional'
import { User as UserApi } from '../../services/api'
import classes from "./restriction.module.css"

const Restriction = (props) => {
	const userApi = new UserApi()
	const [isStart, setIsStart] = useState(true)
	const [ownerImage, setOwnerImage] = useState(null)
	const [isFlipped, setIsFlipped] = useState(false)

	const getDate = (date) => {
		if (date === null) return "Без даты"

		var d = new Date(date)

		var temp = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
			d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

		return temp
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			setIsStart(false)

			if (!ownerImage) {
				const id = props.isOwnerImage ? props.restriction.ownerId : props.restriction.userId

				setOwnerImage(await userApi.getImageById(id))
			}
		}, isStart ? 100 : 50000)

		return () => clearInterval(interval)
	})

	const getBackground = () => new Date(props.restriction.expirationDate) > new Date() ? "#F8B415" : "#c7bfad"

	return (
		<div className={classes.restriction}>
			<div
				className={classes.restriction_owner}
				style={{ background: getBackground() }}
				onClick={() => props.showMiniProfile()} >
				<img alt="" src={ownerImage ?? UserLogo} />
			</div>
			<div
				className={isFlipped ? classes.restriction_inner_flipped : classes.restriction_inner}
				onClick={() => setIsFlipped(!isFlipped)}
			>
				<div className={classes.restriction__face__front} style={{ background: getBackground() }}>
					<div className={classes.restriction_type}>
						Тип:
						{props.restriction.type.name}
					</div>
					<div className={classes.restriction_creation}>
						Создан:
						{getDate(props.restriction.creationDate)}
					</div>
					<div className={classes.restriction_expiration}>
						Истечет:
						{
							new Date(props.restriction.expirationDate) > new Date() ?
								getDate(props.restriction.expirationDate) : "истёк"
						}
					</div>
				</div>
				<div className={classes.restriction__face__back} style={{ background: getBackground() }}>
					<div className={classes.restriction_description}>
						{
							props.restriction.description.length > 80 ? props.restriction.description.substring(0, 80) + "..." : props.restriction.description
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Restriction)