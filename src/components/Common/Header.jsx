import React from "react";
import SignInButton from "./SignInButton";
import IconGames from "../../assets/images/icon-games.svg";
import IconLunge from "../../assets/images/icon-lunge.svg";
import IconFlag from "../../assets/images/icon-flag.svg";
import IconBox from "../../assets/images/icon-box.svg";
import IconInfo from "../../assets/images/icon-info.svg";

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="header-navbar">
                            <div className="navbar-wrapper">
                                <div className="navbar-logo">
                                    <div className="logo-img">

                                    </div>
                                    <div className="logo-text">
                                        InCase
                                    </div>
                                </div>
                                <nav className="navbar">
                                    <div className="navbar-wrapper">
                                        <div className="navbar-route">
                                            <div className="route-wrapper">
                                                <img alt="" src={IconGames}></img>
                                                <p className="route-text">Игры</p>
                                                <img alt="" src={IconLunge}></img>
                                            </div>
                                        </div>
                                        <div className="navbar-route">
                                            <div className="route-wrapper">
                                                <img alt="" src={IconFlag}></img>
                                                <p className="route-text">Баннеры</p>
                                            </div>
                                        </div>
                                        <div className="navbar-route">
                                            <div className="route-wrapper">
                                                <img alt="" src={IconBox}></img>
                                                <p className="route-text">Кейсы</p>
                                            </div>
                                        </div>
                                        <div className="navbar-route">
                                            <div className="route-wrapper">
                                                <img alt="" src={IconInfo}></img>
                                                <p className="route-text">Кейсы</p>
                                                <img alt="" src={IconLunge}></img>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className="header-userbar">
                            <SignInButton/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;