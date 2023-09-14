import React from 'react'
import classes from "../profile-setting.module.css"

const InputData = (props) => {
		return(
			<div className={classes.input_data}>
					<div className={classes.input_tittle}>{props.tittle}</div>
					<div className={classes.data}>
						<div className={classes.data_tittle}>{props.value}</div>
					</div>
			</div>
		);
};

export default InputData;