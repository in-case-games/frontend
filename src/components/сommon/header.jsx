import React, {useState} from "react";

import {
    Language as LanguageButton, 
    Logo as LogoButton 
} from "./button";

import {
    Banner, Games, IndicatorGreen,
    Info, Key, ListLunge, LootBox
} from "../../assets/images/icon";
import Modal from "../modal/modal";

const Header = () => {
    const [modalActive, setModalActive] = useState(false)

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
                            <div className="navbar-route">
                                <img alt="" src={Games}></img>
                                <p className="route-text">Игры</p>
                                <img alt="" src={ListLunge}></img>
                            </div>
                            <div className="navbar-route">
                                <img alt="" src={Banner}></img>
                                <p className="route-text">Баннеры</p>
                            </div>
                            <div className="navbar-route">
                                <img alt="" src={LootBox}></img>
                                <p className="route-text">Кейсы</p>
                            </div>
                            <div className="navbar-route">
                                <img alt="" src={Info}></img>
                                <p className="route-text">Инфо</p>
                                <img alt="" src={ListLunge}></img>
                            </div>
                        </nav>
                    </div>

                    <div className="header-userbar">
                        <button className="btn btn-default" onClick={() => setModalActive(true)}>
                            <img alt="" src={Key}/>
                            <div>Вход</div>
                        </button>
                        <LanguageButton/>
                    </div>
                </div>
            </div>

            <Modal active={modalActive} setActive={setModalActive}/>
        </header>
    );
}

export default Header;