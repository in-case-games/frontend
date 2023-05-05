import React from "react";
import { Helmet } from "react-helmet";
import { ItemRoulette, Banner } from "../../components";
import ReviewSlider from "../../components/review/review-slider";
import {GameGroup} from "../../components/game";

class Home extends React.Component {
    title = "InCase - ";

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }
    games = [
        {
            id: 1,
            image: "https://sun2.ufanet-orenburg.userapi.com/impg/-xrrsqVMW0nTUS8jfmjAEzLcYZZaZZUVpyuv0Q/ZpFxNdEgt78.jpg?size=1500x1500&quality=96&sign=1f81f0b5eca48360a3e45a37568ff190&type=album",
            link: "/game/csgo"
        },
        {
            id: 2,
            image: "https://sun9-east.userapi.com/sun9-27/impg/Uhjnmc41AAJlPnhfxYuoAQ1vCEbQtEnFtqUdog/r8YAmQsbilE.jpg?size=2560x1440&quality=96&sign=65db0daf033c2b766acef2d3941b69dc&type=album",
            link: "/game/dota2"
        }
    ];

    render() {
        return (
            <div className="main">
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <ItemRoulette/>
                <Banner/>
                <div className="container-small">
                    <GameGroup games={this.games} name="Лучший дроп в этих играх"/>
                    <ReviewSlider name="Отзывы"/>
                </div>
            </div>
        );
    }
}

export default Home;