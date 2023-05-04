import React from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const DocumentLink = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        scroll.scrollToTop();
        navigate(props.link);
    };
    return(
        <button className="document-link" onClick={handleClick}>
            {props.text}
        </button>
    );
};

export default DocumentLink;