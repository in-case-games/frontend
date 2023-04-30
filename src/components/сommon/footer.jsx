import React from "react";
import { Anchor as AnchorButton } from "./button";
import { 
    Telegram, VK, YouTube, 
    FlagRUS, ListLunge, Account,
    Star, Box, Cart, 
    InCoin, Radar, Visa,
    Mastercard, World, Qiwi,
    Crypto, Peoples, Project, FAQ
} from "../../assets/images/icon";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-transition">
                    <div class="footer-butterfly">
                        <div class="butterfly"></div>
                    </div>
                    <AnchorButton/>
                </div>
                <div className="footer-site">
                    <div className="container">
                        <div className="site-social">
                            <div className="social-link">
                                <div className="link-bar">
                                    <img alt="" src={YouTube}></img>
                                    <img alt="" src={Telegram}></img>
                                    <img alt="" src={VK}></img>
                                </div>
                                <div className="social-text">
                                    Мы в социальных сетях
                                </div>
                            </div>
                            <div className="social-link">
                                <a className="document-link" href="/#">
                                    Пользовательское соглашение
                                </a>
                                <a className="document-link" href="/#">
                                    Политика использование файлов cookie
                                </a>
                                <a className="document-link" href="/#">
                                    Политика конфиденциальности
                                </a>
                            </div>
                            <div className="social-small-info">
                                <img className="info-flag" alt="" src={FlagRUS}></img>
                                <div>RU</div>
                                <img alt="" src={ListLunge}></img>
                                <div className="small-info">InCase.net @2023</div>
                            </div>
                        </div>
                        <div className="site-statistics">
                            <div className="statistics">
                                <div className="statistics-wrapper">
                                    <div className="statistic">
                                        <img alt="" src={Account}></img>
                                        <div className="statistic-counter">100000000</div>
                                        <div className="statistic-sub">аккаунтов</div>
                                    </div>
                                    <div className="statistic">
                                        <img alt="" src={Star}></img>
                                        <div className="statistic-counter">100000000</div>
                                        <div className="statistic-sub">отзывов</div>
                                    </div>
                                    <div className="statistic">
                                        <img alt="" src={Box}></img>
                                        <div className="statistic-counter">100000000</div>
                                        <div className="statistic-sub">кейсов</div>
                                    </div>
                                </div>
                                <div className="statistics-wrapper">
                                    <div className="statistic">
                                        <img alt="" src={Cart}></img>
                                        <div className="statistic-counter">100000000</div>
                                        <div className="statistic-sub">предметов</div>
                                    </div>
                                    <div className="statistic">
                                        <img alt="" src={InCoin}></img>
                                        <div className="statistic-counter">100000000</div>
                                        <div className="statistic-sub">инкоинов</div>
                                    </div>
                                    <div className="statistic">
                                        <img alt="" src={Radar}></img>
                                        <div className="statistic-counter">100000000</div>
                                        <div className="statistic-sub">онлайн</div>
                                    </div>
                                </div>
                            </div>
                            <div className="types-payment">
                                <img alt="" src={Visa}></img>
                                <img alt="" src={Mastercard}></img>
                                <img alt="" src={World}></img>
                                <img alt="" src={Qiwi}></img>
                                <img alt="" src={Crypto}></img>
                            </div>
                        </div>
                        <div className="site-info">
                            <div className="info-bar">
                                <div className="info">
                                    <img alt="" src={Peoples}></img>
                                    <div>Партнерам</div>
                                </div>
                                <div className="info">
                                    <img alt="" src={Project}></img>
                                    <div>Наши проекты</div>
                                </div>
                                <div className="info">
                                    <img alt="" src={FAQ}></img>
                                    <div>FAQ</div>
                                </div>
                            </div>
                            <div className="info-additional">
                                Все права принадлежат их правообладателям.
                                Сайт не аффилирован 
                                <br/> 
                                и не одобрен компаниями разработчиков игр. Genshin Impact, 
                                <br/>
                                Counter-Strike: Global Offensive, Dota 2.
                                <br/><br/>
                                All rights belong to their copyright holders. The site is not affiliated
                                <br/>
                                 with or approved by the games developers Genshin Impact,
                                 <br/> 
                                 Counter-Strike: Global Offensive, Dota 2.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;