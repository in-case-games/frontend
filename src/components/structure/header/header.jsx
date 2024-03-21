import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Box as BoxApi,
	Game as GameApi,
	Item as ItemApi,
	User as UserApi,
} from '../../../api'
import { FlagRUS, Gamepad, Info } from '../../../assets/images/icons'
import Constants from '../../../constants'
import { Handler } from '../../../helpers/handler'
import { Modal as ModalLayout } from '../../../layouts'
import TokenService from '../../../services/token'
import { ListLunge, Logo, UserBar } from '../../common/buttons'
import { Input } from '../../common/inputs'
import {
	EmailSend as EmailSendWindow,
	ForgotPassword as ForgotPasswordWindow,
	Payment as PaymentWindow,
	SignIn as SignInWindow,
	SignUp as SignUpWindow,
} from '../../windows'
import styles from './header.module'

const Header = () => {
	const navigate = useNavigate()
	const userApi = new UserApi()
	const boxApi = new BoxApi()
	const itemApi = new ItemApi()
	const gameApi = new GameApi()

	const [user, setUser] = useState(null)
	const [width, setWidth] = useState(window.innerWidth)

	const [isDate, setIsDate] = useState(null)
	const [isAuth, setIsAuth] = useState(null)

	const [signUpActive, setSignUpActive] = useState(false)
	const [signInActive, setSignInActive] = useState(false)
	const [emailSendActive, setEmailSendActive] = useState(false)
	const [paymentActive, setPaymentActive] = useState(false)
	const [forgotPasswordActive, setForgotPasswordActive] = useState(false)
	const [burgerActive, setBurgerActive] = useState()

	const [penaltyDelay, setPenaltyDelay] = useState(0)
	const [search, setSearch] = useState()
	const [searchDetected, setSearchDetected] = useState({ items: [] })
	const [games, setGames] = useState()

	const [timeBeforeGoSearch, setTimeBeforeGoSearch] = useState()

	const setWindow = {
		sign_in: () => setSignInActive(true),
		sign_up: () => setSignUpActive(true),
		email: () => setEmailSendActive(true),
		payment: () => setPaymentActive(true),
		forgot: () => setForgotPasswordActive(true),
		close: () => setSignInActive(false),
	}

	const exchangeWindow = window => {
		setBurgerActive()
		setSignUpActive(false)
		setSignInActive(false)
		setEmailSendActive(false)
		setPaymentActive(false)
		setForgotPasswordActive(false)

		setWindow[window]()
	}

	const secondsBeforeRefresh = () => {
		if (isDate === null) return 0

		const expiryToken = new Date(isDate).getTime() + 300000
		const dateNow = new Date().getTime()

		return expiryToken - dateNow
	}

	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(async () => {
			if (timeBeforeGoSearch) {
				const nextTime = timeBeforeGoSearch - 100

				if (nextTime <= 0) {
					let result = []

					try {
						const res = await userApi.getByLogin(search)

						result.push({
							id: res.id,
							image: await userApi.getImageByUserId(res.id),
							name: search,
							click: () => {
								setSearch()
								setSearchDetected(prev => ({ ...prev, items: [] }))
								navigate(`/profile/${res.id}`)
							},
						})
					} catch (ex) {}
					try {
						const res = await boxApi.getByName(search)
						const box = await boxApi.pushImage(res)

						result.push({
							id: box.id,
							image: box.image,
							name: search,
							click: () => {
								setSearch()
								setSearchDetected(prev => ({ ...prev, items: [] }))
								navigate(`/box/${box.id}`)
							},
						})
					} catch (ex) {}
					try {
						let res = await itemApi.getByName(search)

						for (let i = 0; i < res.length; i++) {
							res[i].gameId = games.find(g => g.name === res[i].game).id
							const item = await itemApi.pushImage(res[i])
							result.push({
								id: item.id,
								image: item.image,
								name: search,
								click: () => {
									setSearchDetected(prev => ({ ...prev, items: [] }))
									setSearch()
								},
							})
						}
					} catch (ex) {}

					setSearchDetected(prev => ({ ...prev, items: result }))
					setTimeBeforeGoSearch()
				} else setTimeBeforeGoSearch(nextTime)
			}
		}, 100)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			const isAuthUser = TokenService.getAccessToken() !== undefined

			setIsAuth(isAuthUser && user === null ? null : isAuthUser)
		}, 500)

		return () => clearInterval(interval)
	})

	useEffect(() => {
		const interval = setInterval(async () => {
			const accessToken = TokenService.getAccessToken()

			if (accessToken && !isDate) {
				const expiresTime = TokenService.getExpiresAccessToken()

				setIsDate(expiresTime ? expiresTime : 100)

				if (expiresTime) return
			}

			await Handler.error(
				async () => {
					if (!games) setGames(await gameApi.get())
				},
				undefined,
				undefined,
				penaltyDelay,
				setPenaltyDelay,
				'HEADER'
			)

			if (accessToken) {
				await Handler.error(async () => {
					let response = await userApi.getBalance()

					response =
						response >= 10000000
							? `${Math.ceil(response / 1000000)}M`
							: Math.ceil(response)

					let temp = {
						image: TokenService.getUser()?.image,
						balance: response,
					}

					setUser(temp)
				})
			}

			if (secondsBeforeRefresh() <= 20000 && isAuth) {
				await Handler.error(
					async () => {
						var rs = await userApi.refreshTokens()

						if (rs.status === 200) await TokenService.setUser(rs.data.data)
					},
					ex => {
						//TODO check not found user then TokenService.removeUser()
						console.log(ex)
						return true
					},
					undefined,
					penaltyDelay,
					setPenaltyDelay
				)
			}
			setIsDate(TokenService.getExpiresAccessToken())
		}, 1000 + penaltyDelay)

		return () => clearInterval(interval)
	})

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.header__wrapper}>
					<div className={styles.header_language}>
						<div className={styles.list_lunge}>
							<ListLunge
								isActive={false}
								setIsActive={() => {}}
								tittle='RU'
								icon={FlagRUS}
								items={null}
							/>
						</div>
					</div>
					<div className={styles.header_navbar}>
						<Logo />
						<nav className={styles.navbar}>
							<ListLunge
								isActive={burgerActive === 'games'}
								setIsActive={() =>
									setBurgerActive(burgerActive === 'games' ? '' : 'games')
								}
								tittle='Игры'
								icon={Gamepad}
								items={Constants.Games}
							/>
							<ListLunge
								isActive={burgerActive === 'infos'}
								setIsActive={() =>
									setBurgerActive(burgerActive === 'infos' ? '' : 'infos')
								}
								tittle='Инфо'
								icon={Info}
								items={Constants.Infos}
							/>
						</nav>
					</div>
					{width > 458 ? (
						<div className={styles.header_search_bar}>
							<div className={styles.search}>
								<Input
									isApply={true}
									color='#00ff82'
									placeholder='Поиск'
									value={search}
									setValue={async v => {
										setTimeBeforeGoSearch(500)
										setSearch(v)
									}}
								/>
								<div className={styles.search_items}>
									{searchDetected.items?.length > 0
										? searchDetected.items.map(i => (
												<div
													className={styles.search_item}
													key={i.id + 'search'}
													onClick={i.click}
												>
													<img alt='' src={i.image} className={styles.image} />
													<div className={styles.name}>{i.name}</div>
												</div>
											))
										: null}
								</div>
							</div>
						</div>
					) : null}
					<div className={styles.header_user_bar}>
						<div className={styles.user_bar}>
							<UserBar
								user={user}
								isAuth={isAuth === true}
								isSignIn={isAuth === false}
								showWindow={exchangeWindow}
							/>
						</div>
					</div>
				</div>
			</div>
			<ModalLayout
				isActive={signUpActive}
				close={() => setSignUpActive(false)}
				children={<SignUpWindow exchangeWindow={exchangeWindow} />}
			/>
			<ModalLayout
				isActive={signInActive}
				close={() => setSignInActive(false)}
				children={<SignInWindow exchangeWindow={exchangeWindow} />}
			/>
			<ModalLayout
				isActive={forgotPasswordActive}
				close={() => setForgotPasswordActive(false)}
				children={<ForgotPasswordWindow exchangeWindow={exchangeWindow} />}
			/>
			<ModalLayout
				isActive={emailSendActive}
				close={() => setEmailSendActive(false)}
				children={<EmailSendWindow />}
			/>
			<ModalLayout
				isActive={paymentActive}
				close={() => setPaymentActive(false)}
				children={<PaymentWindow />}
			/>
		</header>
	)
}

export default Header
