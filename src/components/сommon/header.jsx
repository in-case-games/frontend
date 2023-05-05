import React, {useState} from "react";

import {
    Logo as LogoButton,
    ListLunge as ListLungeButton
} from "./button";

import {
    Banner, Games, IndicatorGreen,
    Info, Key, ListLunge, LootBox, FlagRUS
} from "../../assets/images/icon";
import Modal from "../modal/modal";
import SignInWindow from "../modal/sign-in-window";
import SignUpWindow from "../modal/sign-up-window";

const Header = () => {
    const games = [
        {
            id:1,
            text:"CSGO",
            link:"/game/csgo",
            icon:Key
        },
        {
            id:2,
            text:"Dota 2",
            link:"/game/dota2",
            icon:Key
        },
        {
            id:3,
            text:"Скоро",
            link:"/",
            icon:Key
        },
    ];
    const infos = [
        {
            id:1,
            text:"FAQ",
            link:"/",
            icon:Key
        },
        {
            id:2,
            text:"Инфо",
            link:"/info",
            icon:Key
        }
    ]
    const langs = [
        {
            id:1,
            text:"RU",
            link:"/",
            icon:Key
        },
        {
            id:2,
            text:"ENG",
            link:"/",
            icon:Key
        }
    ]
    const [signUpActive, setSignUpActive] = useState(false);
    const [signInActive, setSignInActive] = useState(false);

    const [listActive, setListActive] = useState("empty");

    const isActive = (name) => {
        return name === listActive;
    };

    const exhcangeModal = (signin) => {
        setSignUpActive(!signin);
        setSignInActive(signin);
    };

    const openSignInModal = (signin) => {
        setListActive("empty");
        signin ? setSignInActive(true) : setSignUpActive(true);
    }

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
                        <LogoButton/>
                        <nav className="navbar">
                            <div className="navbar-route" onClick={() => setListActive(listActive === "games" ? "empty" : "games")}>
                                <img alt="" src={Games}></img>
                                <p className="route-text">Игры</p>
                                <img alt="" src={ListLunge}></img>
                                <ListLungeButton isActive={isActive("games")} items={games}/>
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
                                <ListLungeButton isActive={isActive("infos")} items={infos}/>
                            </div>
                        </nav>
                    </div>

                    <div className="header-userbar">
                        <button className="btn btn-default" onClick={() => openSignInModal(true)}>
                            <img alt="" src={Key}/>
                            <div>Вход</div>
                        </button>
                        <div className="btn-lang" onClick={() => setListActive(listActive === "langs" ? "empty" : "langs")}>
                            <img alt="" src={FlagRUS}></img>
                            <div>RU</div>
                            <img alt="" src={ListLunge}></img>
                            <ListLungeButton isActive={isActive("langs")} items={langs}/>
                        </div>
                    </div>
                </div>
            </div>

            <Modal active={signUpActive} setActive={setSignUpActive} content={<SignUpWindow clickSignIn={exhcangeModal}/>}/>
            <Modal active={signInActive} setActive={setSignInActive} content={<SignInWindow clickSignIn={exhcangeModal}/>}/>
        </header>
    );
}

export default Header;