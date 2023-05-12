import React from "react";
import { Anchor as AnchorButton, DocumentLink } from "./button";
import { 
    Telegram, VK, YouTube, 
    FlagRUS, ListLunge, Visa,
    Mastercard, World, Qiwi,
    Crypto, Peoples, Project, FAQ
} from "../../assets/images/icon";
import { Statistic } from "../statistic";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-transition">
                    <div className="butterfly"></div>
                    <div className="footer-butterfly"></div>
                </div>
                <div className="footer-anchor">
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
                                <DocumentLink link="/info/user-agreement" text="Пользовательское соглашение"/>
                                <DocumentLink link="/info/cookie-policy" text="Политика использование файлов cookie"/>
                                <DocumentLink link="/info/privacy-policy" text="Политика конфиденциальности"/>
                            </div>
                            <div className="social-small-info">
                                <img className="info-flag" alt="" src={FlagRUS}></img>
                                <div>RU</div>
                                <img alt="" src={ListLunge}></img>
                                <div className="small-info">InCase.games @2023</div>
                            </div>
                        </div>
                        <div className="site-statistics">
                            <Statistic />
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