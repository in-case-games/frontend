import React from "react";
import { useNavigate } from "react-router-dom";

const Info = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.link);
    };
    const className = props.isActive ? "--activate" : "";

    return(
        <button className={"btn btn-info" + className} onClick={handleClick}>
            {props.name}
        </button>
    );
};

export default Info;