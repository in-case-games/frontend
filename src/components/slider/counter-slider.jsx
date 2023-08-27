import React from 'react'
import classes from "./counter-slider.module.css"
import "./min-slider.css"

const CounterSlider = (props) => {
		const handleClick = (count) => {
				const page = props.page;
				const pages = props.pages;
				
				if(count < 0) props.setPage(page + count > 1 ? page + count : 1);
				else if(count > 0) props.setPage(page + count < pages ? page + count : pages);
		};

		return(
		<div className={classes.counter_slider}>
				<div className='arrow-button' onClick={() => handleClick(-1)}>
						<div className='arrow arrow-left'></div>
				</div>
				<div className={classes.slider_content}>
						{props.page}/{props.pages}
				</div>
				<div className='arrow-button' onClick={() => handleClick(1)}>
						<div className='arrow arrow-right'></div>
				</div>
		</div>);
};

export default CounterSlider;