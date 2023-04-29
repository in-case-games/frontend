import React from "react";
import { useNavigate } from "react-router-dom";
import { Key } from "../../../assets/images/icon";


const SignIn = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };
    return (
        <button className="btn btn-default" onClick={handleClick}>
            <img alt="" src={Key}/>
            <div>Вход</div>
        </button>
    );
};

export default SignIn;