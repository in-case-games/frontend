import React, { useState, useEffect } from "react";
import { Account, Star, Box, Cart, InCoin, Radar } from "../../assets/images/icon";
import { SiteStatistics } from "../../services/api";
const Statistic = () => {
    const statisticsApi = new SiteStatistics();

    const [isStartStats, setIsStartStats] = useState(true);
    const [review, setReviews] = useState(0);
    const [account, setAccount] = useState(0);
    const [box, setBox] = useState(0);
    const [item, setItem] = useState(0);
    const [incoin, setIncoin] = useState(0);
    const [online, setOnline] = useState(0);

    useEffect(() => {
      const interval = setInterval(async () => {
        try {
            const response = await statisticsApi.get();
            setReviews(response.reviews);
            setAccount(response.users);
            setBox(response.lootBoxes);
            setItem(response.withdrawnItems);
            setIncoin(response.withdrawnFunds);
            setIsStartStats(false);
        } 
        catch (err) {
        }
      }, (isStartStats ? 1 : 5000));

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
                    <div className="statistic-counter">{incoin}</div>
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