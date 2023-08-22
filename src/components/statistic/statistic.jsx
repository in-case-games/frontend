import React, { useEffect, useState } from "react"
import { Account, Box, Cart, InCoin, Radar, Star } from "../../assets/images/icon"
import { SiteStatistics } from "../../services/api"
const Statistic = () => {
    const statisticsApi = new SiteStatistics();
    const [review, setReviews] = useState(0);
    const [account, setAccount] = useState(0);
    const [box, setBox] = useState(0);
    const [item, setItem] = useState(0);
    const [inCoin, setInCoin] = useState(0);
    const [online] = useState(0);
    const [isStartStats, setIsStartStats] = useState(true);

    useEffect(() => {
      const interval = setInterval(async () => {
        try {
            const response = await statisticsApi.get();
            setReviews(response.reviews);
            setAccount(response.users);
            setBox(response.lootBoxes);
            setItem(response.withdrawnItems);
            setInCoin(response.withdrawnFunds);
            setIsStartStats(false);
        } 
        catch (err) {
            setIsStartStats(false);
        }
      }, (isStartStats ? 1000 : 5000));

      return () => {
        clearInterval(interval);
      };
    });

    return(
        <div className="statistics">
            <div className="statistics-wrapper">
                <div className="statistic">
                    <img alt="" src={Star}></img>
                    <div className="statistic-counter">{review}</div>
                    <div className="statistic-sub">отзывов</div>
                </div>
                <div className="statistic">
                    <img alt="" src={Account}></img>
                    <div className="statistic-counter">{account}</div>
                    <div className="statistic-sub">аккаунтов</div>
                </div>
                <div className="statistic">
                    <img alt="" src={Box}></img>
                    <div className="statistic-counter">{box}</div>
                    <div className="statistic-sub">кейсов</div>
                </div>
            </div>
            <div className="statistics-wrapper">
                <div className="statistic">
                    <img alt="" src={Cart}></img>
                    <div className="statistic-counter">{item}</div>
                    <div className="statistic-sub">предметов</div>
                </div>
                <div className="statistic">
                    <img alt="" src={InCoin}></img>
                    <div className="statistic-counter">{inCoin}</div>
                    <div className="statistic-sub">инкоинов</div>
                </div>
                <div className="statistic">
                    <img alt="" src={Radar}></img>
                    <div className="statistic-counter">{online}</div>
                    <div className="statistic-sub">онлайн</div>
                </div>
            </div>
        </div>
    );
}

export default Statistic;