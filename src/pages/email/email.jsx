import React from "react"
import { Helmet } from "react-helmet"
import { ResponseHandler } from "./components"

class Email extends React.Component {
    title = "InCase - ";

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }
    render() {
        return (
            <div className='email'>
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <ResponseHandler/>
            </div>
        );
    }
}

export default Email;