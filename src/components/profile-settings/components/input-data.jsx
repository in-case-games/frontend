import React, { useState } from 'react'
import { AirPlaneBlack, Pen } from '../../../assets/images/icon'
import classes from "../profile-setting.module.css"

const InputData = (props) => {
		const [value, setValue] = useState(props.value);
		const [showInput, setShowInput] = useState(false);

		return(
			<div className={classes.input_data}>
					{
						!showInput ?
						<div className={classes.data}>
								<div className={classes.data_tittle}>{props.value}</div>
								{
										props.tittle ? 
										<img 
											className={classes.data_edit} 
											alt='' 
											src={Pen} 
											onClick={() => setShowInput(true)}/> : null
								}
						</div> : null
					}
					{
						props.tittle && showInput ? 
						<div className={classes.input}>
								<div className={classes.input_tittle}>{props.tittle}</div>
								<input 
									maxLength={props.max}
									placeholder={props.tittle}
									value={value}
									name={props.name}
								/>
								<img className={classes.input_send} alt='' src={AirPlaneBlack}/>
						</div> : null
					}
			</div>
		);
};

export default InputData;