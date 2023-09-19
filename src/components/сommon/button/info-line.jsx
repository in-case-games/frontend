import React from 'react'

const InfoLine = (props) => {
	return (
		<div className='info-line'>
			{props.value}
		</div>
	)
}

export default React.memo(InfoLine)