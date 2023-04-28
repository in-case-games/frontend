import React from "react";
import Key from "../../assets/images/icon-key.svg";


const SignInButton = () => {
    return (
        <button className="btn header-button">
            <img alt="" src={Key}/>
            <div>Вход</div>
        </button>
    );
};

export default SignInButton;