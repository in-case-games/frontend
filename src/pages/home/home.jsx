import React from "react";
import {Helmet} from "react-helmet";
import ItemRoulette from "../../components/item/item-roulette";

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
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
                <h1>Main</h1>
            </div>
        );
    }
}

export default Home;