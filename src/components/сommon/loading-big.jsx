import React from 'react'
import { LogoMen } from "../../assets/images/icon"

const LoadingBig = (props) => {
		return(
			<div className='loading-big'>
				<img alt="" src={LogoMen} style={{height: props.height ? props.height : "120px"}}></img>
			</div>
		);
};

export default LoadingBig;