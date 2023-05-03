import React from "react";
import { Helmet } from "react-helmet";
import { ItemRoulette } from "../../components";
import "./info.module.css";
import {InfoSlider} from "./components";

class Info extends React.Component {
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
                <div className="container-small">
                    <div className="info">
                        <InfoSlider/>
                    </div>
                </div>
             </div>
        );
    }
}

export default Info;