import React from 'react'
import classes from "./strip-counter-slider.module.css"

const StripCounterSlider = (props) => {
		return(
		<div className={classes.strip_counter_slider}>
				<input 
					id={classes.strip_slider}
					type='range' 
					value={props.value()} 
					min={0} max={10} 
					orient="vertical" 
					step={1}
					onChange={(event) => props.change(event.target.value)}
					onWheel={e => {
						const num = Number(e.target.value);
						
						if(e.deltaY > 0 && props.value() > 0) props.change(num - 1)
						else if(e.deltaY < 0 && props.value() < 10) props.change(num + 1)
					}}/>
		</div>);
};

export default StripCounterSlider;