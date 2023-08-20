import React from "react"
import { Helmet } from "react-helmet"
import { CSGO, Dota2 } from "../../assets/images/additional"
import { Banner, ItemRoulette } from "../../components"
import { GameGroup } from "../../components/game"
import ReviewSlider from "../../components/review/review-slider"

class Home extends React.Component {
    title = "InCase - ";

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }
    games = [
        {
            id: 1,
            name: "csgo",
            image: CSGO,
            link: "/game/csgo"
        },
        {
            id: 2,
            name: "dota2",
            image: Dota2,
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