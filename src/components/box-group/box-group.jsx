import React from "react";
import classes from "./box-group.module.css";
import { ListLunge } from "../../assets/images/icon";

const BoxGroup = () => {
    return(
        <div className="container-small">
            <div className={classes.box_group}>
                <div className={classes.group_title}>
                    <div className={classes.group_wrapper}>
                        <div>Пушечные кейсы кс го</div>
                        <img alt="" href="#" src={ListLunge}></img>
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
                    
                </div>
            </div>
        </div>
    );
};

export default BoxGroup;