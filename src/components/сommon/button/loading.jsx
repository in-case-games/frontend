import React from 'react'

const Loading = (props) => {
		
		return(
			<div className={ props.isLoading ? 'btn-loading loading' : 'btn-loading' } onClick={() => props.setIsLoading(true)}>↻</div>
		);
};

export default Loading;