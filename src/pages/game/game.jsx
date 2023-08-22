import React from "react"
import { Helmet } from "react-helmet"
import { Banner, ItemRoulette } from "../../components"
import ReviewSlider from "../../components/review/review-slider"
import SearchBar from "../../components/search-bar/search-bar"
import { BoxGroupLoader } from './components'

class Game extends React.Component {
    title = "InCase - ";

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }

    render() {
        return (
            <div className="main">
                <Helmet>
                    <title>{this.gameId}</title>
                </Helmet>
                <ItemRoulette/>
                <Banner/>
                <div className="container-small">
                    <SearchBar/>
                    <BoxGroupLoader/>
                    <ReviewSlider name="Отзывы"/>
                </div>
            </div>
        );
    }
}

export default Game;