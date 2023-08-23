import React from "react"
import { useNavigate } from "react-router-dom"
import { animateScroll as scroll } from "react-scroll"

const DocumentLink = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(window.location.href === `http://localhost:3000${props.link}`) 
            scroll.scrollToTop();
        else 
            window.scrollTo(0, 0);
        
        navigate(props.link);
    }
    return(
        <button className="document-link" onClick={handleClick}>
            {props.text}
        </button>
    );
};

export default DocumentLink;