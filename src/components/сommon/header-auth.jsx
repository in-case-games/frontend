import React, { useState } from "react"
import { animateScroll as scroll } from "react-scroll"
import {
    ListLunge as ListLungeButton,
    Logo as LogoButton
} from "./button"

import {
    Banner,
    FlagRUS,
    Games, IndicatorGreen,
    Info, Key, ListLunge, LootBox
} from "../../assets/images/icon"

const HeaderAuthorization = (props) => {
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

    const [listActive, setListActive] = useState("empty");

    const isActive = (name) => {
        return name === listActive;
    };

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
                            <LogoButton/>
                        </div>
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
                        <div></div>
                        <div className="btn-lang" onClick={() => setListActive(listActive === "langs" ? "empty" : "langs")}>
                            <img alt="" src={FlagRUS}></img>
                            <div>RU</div>
                            <img alt="" src={ListLunge}></img>
                            <ListLungeButton isActive={isActive("langs")} items={langs}/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAuthorization;