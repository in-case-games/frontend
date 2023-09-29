import React, { useEffect, useState } from "react"
import { animateScroll as scroll } from "react-scroll"
import {
    Banner, FlagRUS,
    Games, IndicatorGreen,
    Info, ListLunge, LootBox
} from "../../assets/images/icon"
import { User } from '../../services/api'
import TokenService from '../../services/token'
import {
    EmailSendWindow,
    ForgotPasswordWindow,
    Modal,
    PaymentWindow,
    SignInWindow, SignUpWindow
} from "../modal"
import {
    AuthButton,
    ListLunge as ListLungeButton,
    Logo as LogoButton,
    SignIn as SignInButton
} from './button'
import Constants from './constants'

const Header = () => {
    const userApi = new User()
    const [isDate, setIsDate] = useState(null)
    const [isAuth, setIsAuth] = useState(null)
    const [signUpActive, setSignUpActive] = useState(false)
    const [signInActive, setSignInActive] = useState(false)
    const [sendEmailActive, setSendEmailActive] = useState(false)
    const [paymentActive, setPaymentActive] = useState(false)
    const [forgotActive, setForgotActive] = useState(false)
    let [user, setUser] = useState(null)

    const active = {
        "signin": () => setSignInActive(true),
        "signup": () => setSignUpActive(true),
        "email": () => setSendEmailActive(true),
        "payment": () => setPaymentActive(true),
        "forgot": () => setForgotActive(true),
        "close": () => setSignInActive(false)
    }

    const [listActive, setListActive] = useState("empty")

    const isActive = (name) => name === listActive

    const exchangeModal = (modal) => {
        setListActive("empty")
        setSignUpActive(false)
        setSignInActive(false)
        setSendEmailActive(false)
        setPaymentActive(false)
        setForgotActive(false)

        active[modal]()
    }

    const secondsBeforeRefresh = () => {
        if (isDate === null) return 100

        const expiryToken = new Date(isDate).getTime() + 300000
        const dateNow = new Date().getTime()

        return expiryToken <= dateNow ? 1000 : expiryToken - dateNow
    }
    useEffect(() => {
        const interval = setInterval(async () => {
            if (TokenService.getAccessToken() !== undefined) {
                let responseBalance = await userApi.getBalance()

                responseBalance = responseBalance >= 10000000 ?
                    `${Math.ceil(responseBalance / 1000000)}M` :
                    Math.ceil(responseBalance)

                let temp = {
                    img: user?.img ?? "null",
                    balance: responseBalance
                }

                setUser(temp)
            }
        }, 5000)

        return () => clearInterval(interval)
    })
    useEffect(() => {
        const interval = setInterval(async () => {
            if (TokenService.getAccessToken() !== undefined && user === null) setIsAuth(null)
            else setIsAuth(TokenService.getAccessToken() !== undefined)
        }, 100)

        return () => clearInterval(interval)
    })
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                if (TokenService.getAccessToken()) {
                    await userApi.get()

                    if (sendEmailActive === true) exchangeModal("close")

                    const temp = {
                        img: await userApi.getImage(),
                        balance: user?.balance ?? 0
                    }

                    setUser(temp)
                }
            }
            catch (err) { }
            finally {
                setIsDate(TokenService.getExpiresAccessToken())
            }
        }, secondsBeforeRefresh())

        return () => clearInterval(interval)
    })

    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <div className="header-online">
                        <img alt="" src={IndicatorGreen}></img>
                        <div className="online">
                            <div className="online-number">1000</div>
                            <div className="online-text">Онлайн</div>
                        </div>
                    </div>
                    <div className="header-navbar">
                        <div onClick={() => scroll.scrollToTop()}>
                            <LogoButton />
                        </div>
                        <nav className="navbar">
                            <div className="navbar-route" onClick={() => setListActive(listActive === "games" ? "empty" : "games")}>
                                <img alt="" src={Games}></img>
                                <p className="route-text">Игры</p>
                                <img alt="" src={ListLunge}></img>
                                <ListLungeButton
                                    isActive={isActive("games")}
                                    items={Constants.games} />
                            </div>
                            <div className="navbar-route">
                                <img alt="" src={Banner}></img>
                                <p className="route-text">Баннеры</p>
                            </div>
                            <div className="navbar-route">
                                <img alt="" src={LootBox}></img>
                                <p className="route-text">Кейсы</p>
                            </div>
                            <div className="navbar-route" onClick={() => setListActive(listActive === "infos" ? "empty" : "infos")}>
                                <img alt="" src={Info}></img>
                                <p className="route-text">Инфо</p>
                                <img alt="" src={ListLunge}></img>
                                <ListLungeButton
                                    isActive={isActive("infos")}
                                    items={Constants.infos} />
                            </div>
                        </nav>
                    </div>

                    <div className="header-userbar">
                        {
                            isAuth === true ?
                                <AuthButton user={user} click={exchangeModal} /> : null
                        }
                        {
                            isAuth === false ?
                                <SignInButton click={exchangeModal} /> : null
                        }
                        <div className="btn-lang" onClick={() => setListActive(listActive === "langs" ? "empty" : "langs")}>
                            <img alt="" src={FlagRUS}></img>
                            <div>RU</div>
                            <img alt="" src={ListLunge}></img>
                            <ListLungeButton
                                isActive={isActive("langs")}
                                items={Constants.langs} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                active={signUpActive}
                clickChange={exchangeModal}
                content={<SignUpWindow clickChange={exchangeModal} />} />
            <Modal
                active={signInActive}
                clickChange={exchangeModal}
                content={<SignInWindow clickChange={exchangeModal} />} />
            <Modal
                active={forgotActive}
                clickChange={exchangeModal}
                content={<ForgotPasswordWindow clickChange={exchangeModal} />}
            />
            <Modal
                active={sendEmailActive}
                clickChange={exchangeModal}
                content={<EmailSendWindow />}
            />
            <Modal
                active={paymentActive}
                clickChange={exchangeModal}
                content={<PaymentWindow />}
            />
        </header>
    )
}

export default Header