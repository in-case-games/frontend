import React from "react"
import { useNavigate } from "react-router-dom"
import { animateScroll as scroll } from 'react-scroll'

const ItemLunge = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(window.location.href === `http://localhost:3000${props.item.link}`) 
            scroll.scrollToTop();
        else 
            window.scrollTo(0, 0);
        
        navigate(props.item.link);
    }

    return(
        <div className="item-lunge" onClick={handleClick}>
            <img alt="" href="#" src={props.item.icon}></img>
            <div>{props.item.text}</div>
        </div>
    );
};

export default ItemLunge;