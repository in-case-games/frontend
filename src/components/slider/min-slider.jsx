import React, {useState} from "react"
import classes from "./min-slider.module.css"
import "./min-slider.css"

const MinSlider = ({items, speed = 150}) => {
    const [slide, setSlide] = useState(0);


    return (
        <div className="min_slider">
            <div className="min_slider_content"
                style={{marginLeft: slide}}>
                {items}
            </div>
            <div className={classes.min_slider_buttons}>
                <button className="arrow-button"
                        onClick={() => setSlide((slide + speed) <= 0 ? slide + speed: slide)}
                        >
                    <div className="arrow arrow-left">

                    </div>
                </button>
                <button className="arrow-button"
                        onClick={() => {
                            let itemsWidth = document.getElementsByClassName('min_slider')[0].clientWidth;
                            let itemWidth = itemsWidth / (items.length);
                            console.log(itemsWidth);
                            setSlide((slide - speed) > (-1*itemsWidth) ? slide - speed: slide)
                        }}>
                    <div className="arrow arrow-right">

                    </div>
                </button>
            </div>
        </div>

    )
}

export default MinSlider;