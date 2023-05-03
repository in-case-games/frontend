import React from "react"
import classes from "./group.module.css"
import {ListLunge} from "../../assets/images/icon";
import MinSlider from "../slider/min-slider";

const Group = ({items, name, type = "block"}) => {
    const [showItems, setShowItems] = React.useState(true);
    const onClick = () => setShowItems(!showItems);

    if (items.length === 0)
    {
        items = <p className={classes.empty_text}>Пусто</p>
    }

    else if (type === "slider"){
        items = <MinSlider items={items}/>
    }


    return (
        <div className={classes.group}>
            <div className={classes.group_title}>
                <div className={classes.group_wrapper}>
                    <div>{name}</div>
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
                {showItems ? items : null }
            </div>
        </div>
    )
}

export default Group;