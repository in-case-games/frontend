import React from 'react'
import classes from "./counter-slider.module.css"
import "./min-slider.css"

const CounterSlider = (props) => {
		return(
		<div className={classes.counter_slider}>
				<div className='arrow-button' onClick={() => props.eventClick(-1)}>
						<div className='arrow arrow-left'></div>
				</div>
				<div className={classes.slider_content}>
						{props.page}/{props.pages}
				</div>
				<div className='arrow-button' onClick={() => props.eventClick(1)}>
						<div className='arrow arrow-right'></div>
				</div>
		</div>);
};

export default CounterSlider;