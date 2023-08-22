import React from "react"
import { InCoinGreenBalance, PlusGreenBalance } from '../../../assets/images/icon'

const AuthButton = (props) => {
    return (
        <div className='btn btn-balance' onClick={() => props.click("payment")}>
						<img className='balance-plus' alt="" src={PlusGreenBalance} href="#"></img>
						<div className='balance'>
								<div className='balance-amount'>
										{props.user.balance}
								</div>
								<img className='balance-incoin' alt="" src={InCoinGreenBalance} href="#"></img>
						</div>
				</div>
    );
};

export default AuthButton;