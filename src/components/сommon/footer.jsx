import React from "react";
import { Anchor as AnchorButton } from "./button";

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