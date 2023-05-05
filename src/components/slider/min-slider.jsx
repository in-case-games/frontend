import React, {useState} from "react"
import classes from "./min-slider.module.css"
import "./min-slider.css"

const MinSlider = ({items, speed = 250}) => {
    const [slide, setSlide] = useState(0);
    const [counter, setCounter] = useState(0);


    return (
        <div className="min_slider">
            <div className="min_slider_content"
                style={{marginLeft: slide}}>
                {items}
            </div>
            <div className={classes.min_slider_buttons}>
                <button className="arrow-button"
                        onClick={() =>
                            {
                                setCounter(counter > 0? counter - 1: counter);
                                setSlide((slide + speed) <= 0 ? slide + speed: slide);
                            }
                        }
                        >
                    <div className="arrow arrow-left">

                    </div>
                </button>
                <button className="arrow-button"
                        onClick={() => {
                            let items = document.getElementsByClassName('min_slider')[0];
                            let itemWidth = items.children[0].children[0].offsetWidth;
                            let itemsCount = items.children[0].childElementCount - Math.floor((items.offsetWidth / itemWidth)) - counter;
                            setCounter(itemsCount > 0? counter + 1: counter);
                            setSlide(itemsCount > 0 ? slide - speed: slide)

                        }}>
                    <div className="arrow arrow-right">

                    </div>
                </button>
            </div>
        </div>

    )
}

export default MinSlider;