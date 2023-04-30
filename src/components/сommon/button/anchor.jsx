import React from "react";
import { animateScroll as scroll } from "react-scroll";


const Anchor = () => {
    return (
        <button className="btn-anchor" onClick={() => scroll.scrollToTop()}> 
            <div className="anchor-inside"></div>
        </button>
    );
};

export default Anchor;