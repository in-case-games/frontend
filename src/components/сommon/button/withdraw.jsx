import React from "react"
import { AirPlaneBlack } from "../../../assets/images/icon"

const Withdraw = (props) => {
    return (
        <button className="btn btn-withdraw" onClick={() => props.click()}>
					<img alt="" src={AirPlaneBlack}></img>
					<div className='withdraw-text'>{props.text}</div>
				</button>
    );
};

export default Withdraw;