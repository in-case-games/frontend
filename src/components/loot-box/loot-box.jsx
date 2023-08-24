import React from "react"
import { useNavigate } from "react-router-dom"
import { Box } from '../../assets/images/additional'
import CostBox from "../сommon/button/cost-box"
import classes from "./loot-box.module.css"

const LootBox = (props) => {
    const name = props.box.isLocked ? classes.lootbox_locked : classes.lootbox;
    const navigate = useNavigate();

    return(
        <div className={name} onClick={() => navigate(`/box/${props.box.id}`)}>
            <img alt="" href="#" src={props.box.image ? "" : Box}></img>
            <div className={classes.box_name}>{props.box.name}</div>
            <div className={classes.btn_cost_box}>
                <CostBox cost={props.box.cost}/>
            </div>
            <div className={classes.box_delimiter}></div>
        </div>
    );
};

export default LootBox;