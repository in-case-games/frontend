import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoMen } from "../../../assets/images/icon";

const Logo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };
    return(
        <div className="navbar-logo" onClick={handleClick}>
            <div className="logo-img">
                <img alt="" src={LogoMen}></img>
            </div>
            <div className="logo-text">
                InCase
            </div>
        </div>
    );
};

export default Logo;