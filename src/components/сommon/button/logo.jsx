import React from "react"
import { useNavigate } from "react-router-dom"
import { animateScroll as scroll } from 'react-scroll'
import { LogoMen } from "../../../assets/images/icon"

const Logo = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(window.location.href === `http://localhost:3000/`) 
            scroll.scrollToTop();
        else 
            window.scrollTo(0, 0);
        
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