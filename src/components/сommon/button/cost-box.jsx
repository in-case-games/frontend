import React from "react";

const CostBox = (props) => {
    return(
        <button className="btn btn-cost-box">
            <div>{props.cost}</div>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.69238 22.1539L10.5617 11.9008C13.1779 7.99592 18.9246 8.00907 21.5229 11.9259V11.9259C24.4273 16.3042 21.288 22.1539 16.0339 22.1539H8.58826" stroke="currentColor" strokeWidth="2"/>
                <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
        </button>
    );
};

export default CostBox;