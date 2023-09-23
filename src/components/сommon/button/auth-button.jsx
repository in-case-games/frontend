import React from "react"
import { useNavigate } from "react-router-dom"
import { InCoinGreenBalance, PlusGreenBalance } from '../../../assets/images/icon'

const AuthButton = (props) => {
	const navigate = useNavigate()

	return (
		<div className='userbar-auth'>
			<div className='btn btn-balance' onClick={() => props.click("payment")}>
				<img className='balance-plus' alt="" src={PlusGreenBalance} href="#"></img>
				<div className='balance'>
					<div className='balance-amount'>
						{props.user.balance}
					</div>
					<img className='balance-incoin' alt="" src={InCoinGreenBalance} href="#"></img>
				</div>
			</div>
			<img
				className='userbar-logo'
				alt=""
				src={props.user.img}
				href="#"
				onClick={() => navigate("/profile")}
			/>
		</div>
	)
}

export default AuthButton