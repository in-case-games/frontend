import React from "react";
import classes from './item.module.css'
import {itemColors, itemGradients} from "./item-colors";

const BigItem = (props) => {
    let color = props.color ? props.color: "white";
    let itemColor = itemColors[color]
    let gradientColor = itemGradients[color];

    return(
        <div className={classes.big_item} style={{background: gradientColor, borderBottom: `5px solid ${itemColor}`}}>
            <img src={props.imgSrc}
                 alt=""/>
            <p>{props.itemName}</p>
        </div>
    );
};

export default BigItem;