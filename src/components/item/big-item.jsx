import React from "react"
import { Item } from '../../assets/images/additional'
import { itemColors, itemGradients } from "./item-colors"
import classes from './item.module.css'

const BigItem = (props) => {
    let color = props.color ? props.color: "white";
    let itemColor = itemColors[color]
    let gradientColor = itemGradients[color];
    var d = new Date(props.date);
    var date = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    return(
        <div className={classes.big_item} style={{background: gradientColor, borderBottom: `5px solid ${itemColor}`}}>
            <img src={Item} alt=""/>
            <p className={classes.item_name}>{props.name.length > 25 ? props.name.substring(0, 25) + "..." : props.name}</p>
            <p className={classes.item_date}>{date}</p>
        </div>
    );
};

export default BigItem;