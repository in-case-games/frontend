import React from "react";
import {
  PaymentCryptoBeige as CryptoImage,
  FaqBeige as FaqImage,
  FlagRUS as FlagRUSImage,
  PaymentMastercardBeige as MastercardImage,
  PeoplesBeige as PeoplesImage,
  SettingBeige as SettingImage,
  TelegramBeige as TelegramImage,
  VkBeige as VkImage,
  PaymentVisaBeige as VisaImage,
  PaymentWorldBeige as WorldImage,
  YouTubeBeige as YouTubeImage,
} from "../../../assets/images/icons";
import { Statistics, Anchor } from "./components";
import { Link } from "../../common/buttons";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import styles from "./footer.module";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_butterfly}>
        <div className={styles.top}></div>
        <div className={styles.bottom}></div>
      </div>
      <div className={styles.anchor}>
        <Anchor />
      </div>
      <div className={styles.footer_content}>
        <div className={styles.footer__container}>
          <div className={styles.footer__wrapper}>
            <div className={styles.footer_links}>
              <div className={styles.footer_social}>
                <div className={styles.social_bar}>
                  <img alt="" src={YouTubeImage} href="#" />
                  <img alt="" src={TelegramImage} href="#" />
                  <img alt="" src={VkImage} href="#" />
                </div>
                <div className={styles.text}>Мы в социальных сетях</div>
              </div>
              <div className={styles.policy}>
                <Link
                  link="info/user-agreement"
                  text="Пользовательское соглашение"
                  isScrollToTop={true}
                />
                <Link
                  link="info/cookie-policy"
                  text="Политика использование файлов cookie"
                  isScrollToTop={true}
                />
              </div>
              <div className={styles.footer_project_mark}>
                <div className={styles.flag}>
                  <img alt="" src={FlagRUSImage} />
                  RU
                </div>
                <div className={styles.project}>InCase.games @2023</div>
              </div>
            </div>
          </div>
          <div className={styles.footer_statistics}>
            <Statistics />
            <div className={styles.payments}>
              <img alt="" src={VisaImage} />
              <img alt="" src={MastercardImage} />
              <img alt="" src={WorldImage} />
              <img alt="" src={CryptoImage} />
            </div>
          </div>
          <div className={styles.footer_info}>
            <div className={styles.project_links}>
              <a className={styles.link} href="#">
                <img alt="" src={PeoplesImage}></img>
                <div>Партнерам</div>
              </a>
              <a className={styles.link} href="#">
                <img alt="" src={SettingImage}></img>
                <div>Наши проекты</div>
              </a>
              <a
                className={styles.link}
                onClick={() => {
                  if (window.location.href === `http://localhost:3000/faq`)
                    scroll.scrollToTop();
                  else window.scrollTo(0, 0);
                  navigate("faq");
                }}
              >
                <img alt="" src={FaqImage}></img>
                <div>FAQ</div>
              </a>
            </div>
            <div className={styles.project_independent}>
              Все права принадлежат их правообладателям. Сайт не аффилирован и
              не одобрен компаниями разработчиков игр. Counter-Strike: Global
              Offensive, Dota 2.
              <br />
              <br />
              All rights belong to their copyright holders. The site is not
              affiliated with or approved by the games developers.
              Counter-Strike: Global Offensive, Dota 2.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
