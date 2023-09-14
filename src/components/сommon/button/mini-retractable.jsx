import React, { useState } from 'react'

const MiniRetractable = (props) => {
		const [openBtn, setOpenBtn] = useState(false);
		
		return(
		<div className='btn-mini-retractable' style={{background: props.color}} onMouseEnter={() => setOpenBtn(true)} onMouseLeave={() => setOpenBtn(false)} onMouseDown={() => props.click()}>
				<img src={props.image} alt=""></img>
				{
					openBtn ? 
					<div>{props.text}</div>: null 
				}
		</div>);
};

export default MiniRetractable;