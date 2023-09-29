import React, { useEffect, useState } from 'react'
import { Box } from '../../assets/images/additional'
import { LinkOrange } from '../../assets/images/icon'
import { Box as BoxApi, Game as GameApi } from '../../services/api'
import TokenService from '../../services/token'
import { InfoLine, Loading } from '../сommon/button'
import classes from "./modal.module.css"

const BoxWindow = (props) => {
	const boxApi = new BoxApi()
	const gameApi = new GameApi()

	const patternBox = {
		name: "Шаблончик",
		cost: 1,
		game: "csgo",
	}

	const [isLoading, setIsLoading] = useState(true)
	const [isClickChange, setIsClickChange] = useState(false)

	const [endTimeBackOperation, setEndTimeBackOperation] = useState(null)
	const [operation, setOperation] = useState(null)
	const [user, setUser] = useState(TokenService.getUser())
	const [box, setBox] = useState(props.box?.id ? props.box : patternBox)

	const [games, setGames] = useState([])

	useEffect(() => {
		const interval = setInterval(async () => setIsLoading(!isClickChange), 5000)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isLoading) {
				setUser(TokenService.getUser())

				setBox(props.box?.id ?
					await boxApi.getBox(props.box?.id) : patternBox)

				setGames(await gameApi.getGames())

				setIsLoading(false)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			if (endTimeBackOperation !== null) {
				let temp = endTimeBackOperation - 1
				temp = temp >= 0 ? temp : 0

				setEndTimeBackOperation(temp)

				if (temp === 0) {
					await operations[operation]()

					setOperation(null)
					setEndTimeBackOperation(null)
				}
			}
		}, 1000)

		return () => clearInterval(interval)
	})

	const handleClick = (isOperationDelete = false) => {
		if (endTimeBackOperation > 0) {
			setEndTimeBackOperation(null)
			setOperation(null)
		}
		else if (endTimeBackOperation === null) {
			setEndTimeBackOperation(5)

			if (isOperationDelete) setOperation("deleteBox")
			else if (box?.id) setOperation("updateBox")
			else setOperation("createBox")
		}
	}

	const setValue = (value) => {
		setIsClickChange(true)
		setBox(value)
	}

	const loadImg = () => {
		if (user.role === "owner") props.openLoadWindow(true)
	}

	const deleteBox = async () => {
		await boxApi.deleteBox(box.id)

		props.setImage(null)
		props.setBox()
		setBox(patternBox)
		setIsClickChange(false)
		setIsLoading(true)
	}

	const updateBox = async () => {
		box.image = props.image
		box.gameId = games.find(r => r.name === box.game).id

		const response = await boxApi.updateBox(box)

		response.game = box.game
		response.image = props.image || props.box?.image

		props.setImage(null)
		props.setBox(response)
		setBox(response)
		setIsClickChange(false)
		setIsLoading(true)
	}

	const createBox = async () => {
		box.image = props.image
		box.gameId = games.find(r => r.name === box.game).id

		const response = await boxApi.createBox(box)

		response.game = box.game
		response.image = props.image || props.box?.image

		props.setImage(null)
		props.setBox(response)
		setBox(response)
		setIsClickChange(false)
		setIsLoading(true)
	}

	const operations = {
		"createBox": createBox,
		"deleteBox": deleteBox,
		"updateBox": updateBox
	}

	return (
		<div className={classes.box_window}>
			<div className={classes.box_content}>
				<div className={classes.box_header}>
					<Loading isLoading={isLoading} click={() => {
						setIsClickChange(false)
						setIsLoading(true)
						props.setImage(null)
					}} />
					<div className={classes.box_tittle}>Информация по кейсу</div>
					<a className={classes.link_img} target='_blank' rel="noopener noreferrer" href={`/box/${props.box.id}`}>
						<img
							alt=""
							src={LinkOrange}
						/>
					</a>
				</div>
				<div className={classes.box_info}>
					<div
						className={classes.box_img}
						onClick={() => loadImg()}
						style={{ cursor: user.role === "owner" ? "pointer" : "default" }}
					>
						{
							<img
								alt=""
								src={props?.image || props?.box?.image || Box}
							/>
						}
					</div>
				</div>
				<div className={classes.delimiter}></div>
				<div className={classes.box_sub_tittle}>Подробная информация</div>
				<div className={classes.info_additional}>
					<InfoLine
						value={box?.name}
						setValue={value => setValue({ ...box, name: value })}
						name="box-name"
						placeholder="Название"
						isReadOnly={user.role !== "owner"}
					/>
					<InfoLine
						value={box?.cost}
						setValue={value => setValue({ ...box, cost: value })}
						name="box-cost"
						placeholder="Стоимость"
						isReadOnly={user.role !== "owner"}
					/>
					<InfoLine
						value={box?.isLocked || !box?.id ? "Нет" : "Да"}
						setValue={_ => { }}
						name="box-is-locked"
						placeholder="Доступен"
						isReadOnly={true}
					/>
					<InfoLine
						value={box?.game}
						setValue={value => setValue({ ...box, game: value })}
						name="box-game"
						placeholder="Игра"
						isReadOnly={user.role !== "owner"}
						comboBox={games}
					/>
				</div>
				{
					user.role === "owner" ?
						<div className={classes.info_buttons}>
							{
								endTimeBackOperation === null ?
									<div className={classes.btn_send} onClick={() => handleClick()}>
										{box?.id ? "Изменить" : "Создать"}
									</div> : null
							}
							{
								box?.id && endTimeBackOperation === null ?
									<div className={classes.btn_delete} onClick={() => handleClick(true)}>
										Удалить
									</div> : null
							}
							{
								endTimeBackOperation !== null ?
									<div className={classes.btn_back} onClick={() => handleClick()}>
										<p>Вернуть</p>
										<p className={classes.timer}>{endTimeBackOperation}</p>
									</div>
									: null
							}
						</div> : null
				}
			</div>
		</div>
	)
}

export default BoxWindow