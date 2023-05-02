import React from "react";
import { Helmet } from "react-helmet";
import { Panel as PanelButton } from "../../components/сommon/button";

class InfoSite extends React.Component {
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
                <div className="container-small">
                    <div className="panels">
                        <PanelButton/>
                    </div>
                </div>
             </div>
        );
    }
}

export default InfoSite;