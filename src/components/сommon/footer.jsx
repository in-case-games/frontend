import React from "react";
import { Anchor as AnchorButton } from "./button";
import { 
    Telegram, VK, YouTube, 
    FlagRUS, ListLunge 
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
                            <a className="document-link">
                                Пользовательское соглашение
                            </a>
                            <a className="document-link">
                                Политика использование файлов cookie
                            </a>
                            <a className="document-link">
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

                        </div>
                        <div className="types-payment">

                        </div>
                    </div>
                    <div className="site-info">
                        <div className="info-bar">

                        </div>
                        <div className="info-additional">
                            <p>
                                Все права принадлежат их правообладателям. 
                                Сайт не аффилирован и не одобрен компаниями разработчиков игр Genshin Impact, 
                                Counter-Strike: Global Offensive, Dota 2.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;