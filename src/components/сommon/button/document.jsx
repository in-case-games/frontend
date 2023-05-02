import React from "react";
import { useNavigate } from "react-router-dom";

const DocumentLink = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.link);
    };
    return(
        <button className="document-link" onClick={handleClick}>
            {props.text}
        </button>
    );
};

export default DocumentLink;