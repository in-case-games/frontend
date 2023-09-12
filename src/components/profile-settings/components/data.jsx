import React from 'react'
import { Pen } from '../../../assets/images/icon'
import classes from "../profile-setting.module.css"

const Data = (props) => {
		return(
			<div className={classes.data}>
					<div className={classes.data_tittle}>{props.title}</div>
					{
						props.showButton ? 
						<img className={classes.data_edit} alt='' src={Pen}/> : 
						null
					}
			</div>
		);
}

export default Data;