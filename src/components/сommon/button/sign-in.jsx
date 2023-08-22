import React from "react"
import { Key } from "../../../assets/images/icon"


const SignIn = (props) => {
    return (
        <button className="btn btn-default" onClick={props.click}>
            <img alt="" src={Key}/>
            <div>Вход</div>
        </button>
    );
};

export default SignIn;