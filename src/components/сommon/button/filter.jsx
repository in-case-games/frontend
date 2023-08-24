import React from 'react'

const Filter = (props) => {
		var keys = Object.keys(props.types);

		const handleClick = () => {
				if(keys.length <= keys.indexOf(props.filter) + 1)
						props.setFilter(keys[0]);
				else
						props.setFilter(keys[keys.indexOf(props.filter) + 1]);
		};

		return(
				<div className='btn-filter'>
						<p className='filter-text' onClick={() => handleClick()}>
							{props.types[props.filter]}
						</p>
				</div>
		);
};

export default Filter;