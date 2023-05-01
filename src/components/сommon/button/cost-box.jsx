import React from "react";
import { InCoin } from "../../../assets/images/icon";

const CostBox = (props) => {
    return(
        <button className="btn btn-cost-box">
            <div>{props.cost}</div>
            <img alt="" href="/#" src={InCoin}></img>
        </button>
    );
};

export default CostBox;