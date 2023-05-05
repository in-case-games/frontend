import React from "react";
import { useNavigate } from "react-router-dom";

const ItemLunge = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.item.link);
    };
    return(
        <div className="item-lunge" onClick={handleClick}>
            <img alt="" src={props.item.icon}></img>
            <div>{props.item.text}</div>
        </div>
    );
};

export default ItemLunge;