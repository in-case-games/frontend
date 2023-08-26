import React from "react"
import { Helmet } from "react-helmet"
import { InfoSlider } from "./components"
import "./info.css"

class Info extends React.Component {
    title = "InCase - ";

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }

    render() {
        return (
             <div className="info">
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <div className="container-small">
                    <InfoSlider/>
                </div>
             </div>
        );
    }
}

export default Info;