import React from "react";
import {Helmet} from "react-helmet";
import classes from './error.module.css'

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
                <h1 className={classes.error_title}>Упс... Такой страницы не существует, возможно, вам и не
                нужно переходить по данной ссылке :)</h1>
            </div>
        );
    }
}

export default NotFound;