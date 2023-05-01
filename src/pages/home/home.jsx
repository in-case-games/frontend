import React from "react";
import { Helmet } from "react-helmet";
import { ItemRoulette, BoxGroup, Banner } from "../../components";
import SearchBar from "../../components/search-bar/search-bar";

class Home extends React.Component {
    title = "InCase - ";

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }

    render() {
        return (
            <div className="main">
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <ItemRoulette/>
                <Banner/>
                <SearchBar/>
                <BoxGroup/>
                <BoxGroup/>
                <BoxGroup/>
            </div>
        );
    }
}

export default Home;