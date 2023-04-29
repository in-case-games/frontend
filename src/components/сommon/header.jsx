import React from "react";

import { 
    SignIn as SignInButton, 
    Language as LanguageButton, 
    Logo as LogoButton 
} from "./button";

import { 
    Banner, Games, IndicatorGreen, 
    Info, ListLunge, LootBox 
} from "../../assets/images/icon";

class Header extends React.Component {
    render() {
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
                            <SignInButton/>
                            <LanguageButton/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;