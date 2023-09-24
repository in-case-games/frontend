import React from "react"

const SquarePanel = (props) => {
	return (
		<div className='square-panel' onClick={() => props.click()}>
			<img src={props.img} alt="" />
		</div>
	)
}

export default SquarePanel