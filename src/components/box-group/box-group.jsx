import React from "react";
import classes from "./box-group.module.css";
import { ListLunge } from "../../assets/images/icon";
import LootBox from "../loot-box/loot-box";

const BoxGroup = (props) => {
    const [showBoxes, setShowBoxes] = React.useState(true)
    const onClick = () => setShowBoxes(!showBoxes)

    const boxes = props.boxes.map((box) => <LootBox box={box} key={box.id}/>);

    return(
        <div className={classes.box_group}>
            <div className={classes.group_title}>
                <div className={classes.group_wrapper}>
                    <div>{props.name}</div>
                    <img alt="" href="#" src={ListLunge} onClick={onClick}></img>
                </div>
                <div className={classes.group_delimiter}>
                    <div className={classes.delimiter_top}></div>
                    <div className={classes.delimiter_bot}>
                        <div className={classes.delimiter_vertical}></div>
                        <div className={classes.delimiter_center}>
                            <div></div>
                            <div></div>
                        </div>
                        <div className={classes.delimiter_vertical}></div>
                    </div>
                </div>
            </div>
            <div className={classes.group_content}>
                {showBoxes ? boxes : null }
            </div>
        </div>
    );
};

export default BoxGroup;