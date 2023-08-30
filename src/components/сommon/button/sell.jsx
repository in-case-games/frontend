import React from "react"
import { CartBlack } from "../../../assets/images/icon"

const Sell = (props) => {
    return (
        <button className="btn btn-sell" onClick={() => props.click()}>
					<img alt="" src={CartBlack}></img>
					<div className='sell-text'>{props.text}</div>
				</button>
    );
};

export default Sell;