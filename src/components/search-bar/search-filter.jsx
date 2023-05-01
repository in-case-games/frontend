import React from "react";
import classes from './search.module.css';

const SearchFilter = (props) => {
    let button_func = props.buttonFunc ? props.buttonFunc: "javascript.void(0)";

    return (
        <button className={classes.search_filter} onClick={button_func}>
            <img alt="filter" className={classes.filter_image} src={props.iconUri}
            />
        </button>
    )
}

export default SearchFilter;