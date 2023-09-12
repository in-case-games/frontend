import React, { useState } from 'react'
import { AirPlaneBlack } from '../../../assets/images/icon'
import classes from "../profile-setting.module.css"

const Input = (props) => {
		const [value, setValue] = useState(props.value);

		return(
			<div className={classes.input}>
					<div className={classes.input_tittle}>{props.title}</div>
					<input 
						maxLength={props.max}
						placeholder="Логин"
						value={value}
						name={props.name}
					/>
					<img className={classes.input_send} alt='' src={AirPlaneBlack}/>
			</div>
		);
};

export default Input;