import React from "react";
import classes from './review.module.css'
import Review from "./review";

const ReviewSlider = () => {
    return(
        <div className={classes.review_slider}>
            <Review img="https://sun9-77.userapi.com/impg/noNE9DIutXHVJzI9mJyHDtkxpQmqC9jF9bV02w/2pNN03BJygg.jpg?size=163x148&quality=96&sign=e8a176576b99dd084347ecb9cc754929&type=album"
                username="GIS"
                date="11.11.2011"
                content="ОМГ 0МГ ЗА 100 РУБЛЕЙ КЛАСС СПАСИБО!"/>
            <Review img="https://sun9-77.userapi.com/impg/noNE9DIutXHVJzI9mJyHDtkxpQmqC9jF9bV02w/2pNN03BJygg.jpg?size=163x148&quality=96&sign=e8a176576b99dd084347ecb9cc754929&type=album"
                    username="АНАН"
                    date="11.11.2091"
                    content="ОМГ 0МГ ЗА 100 РУБЛЕЙ КЛАСС СПАСИБО!"/>
            <Review img="https://sun9-22.userapi.com/impg/QiZyH70Ck_pQhMk4nDwy4jI_Feryo9_3aftWoQ/PSwSJ6qTxCM.jpg?size=1200x1169&quality=95&sign=a6d0fe791cbb2adc0ed0a838f4412be1&type=album"
                    username="ЧЕТКИЙ ВАНЕУК"
                    date="11.11.2091"
                    content="ОМГ 0МГ ЗА 100 РУБЛЕЙ КЛАСС СПАСИБО!"/>
            <Review img="https://sun9-28.userapi.com/impg/QgaUIX7vEBlTnB5mT_3VwCqOYVwwwUwgTId-cw/Kdyz7Zhl5XM.jpg?size=2160x2160&quality=96&sign=8e727b359a465c045c88d852cc292e36&type=album"
                    username="ХУЕК"
                    date="11.11.2091"
                    content="ОМГ 0МГ ЗА 100 РУБЛЕЙ КЛАСС СПАСИБО!"/>
        </div>
    )
}

export default ReviewSlider;