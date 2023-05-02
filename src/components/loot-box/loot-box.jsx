import React from "react";
import classes from "./loot-box.module.css";
import CostBox from "../сommon/button/cost-box";

const LootBox = (props) => {
    return(
        <div className={classes.lootbox}>
            <img alt="" href="#" src={props.box.image}></img>
            <div className={classes.box_name}>{props.box.name}</div>
            <div className={classes.btn_cost_box}>
                <CostBox cost={props.box.cost}/>
            </div>
            <div className={classes.box_delimiter}></div>
        </div>
    );
};

export default LootBox;