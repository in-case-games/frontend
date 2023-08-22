import React from "react"
import { useNavigate } from "react-router-dom"

const ItemLunge = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.item.link);
        window.location.reload();
    };
    return(
        <div className="item-lunge" onClick={handleClick}>
            <img alt="" href="#" src={props.item.icon}></img>
            <div>{props.item.text}</div>
        </div>
    );
};

export default ItemLunge;