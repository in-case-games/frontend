import React from "react";
import {Helmet} from "react-helmet";

class NotFound extends React.Component {
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
                Not Found
            </div>
        );
    }
}

export default NotFound;