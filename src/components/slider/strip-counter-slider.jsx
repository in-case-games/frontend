import React from 'react'
import classes from "./strip-counter-slider.module.css"

const StripCounterSlider = (props) => {
		return(
		<div className={classes.strip_counter_slider}>
				<input type='range' value={0} min={0} max={10} orient="vertical"/>
		</div>);
};

export default StripCounterSlider;