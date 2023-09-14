import React from "react"
import { Helmet } from "react-helmet"

class Email extends React.Component {
    title = "InCase - Подтверждение через почту";

    render() {
        return (
            <div className='email'>
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <this.props.handler/>
            </div>
        );
    }
}

export default Email;