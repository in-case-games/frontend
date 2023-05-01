import React from "react";
import classes from './review.module.css'
import Review from "./review";
import {ListLunge} from "../../assets/images/icon";

let reviewsTemplate = [
    {
        id: 1,
        img: "https://sun9-31.userapi.com/impg/LXW1l3h1Gk9pmmQJxMJA3dmp20MlSQngu1OI6Q/l5_Hpbl9d2Q.jpg?size=225x225&quality=95&sign=478ef1f6498745cf9e510f6323d5e9b9&type=album",
        username: "Даунилка",
        date: "11.11.2011",
        content: "ИДИТЕ НАХУЙ"
    },
    {
        id: 2,
        img: "https://sun9-77.userapi.com/impg/noNE9DIutXHVJzI9mJyHDtkxpQmqC9jF9bV02w/2pNN03BJygg.jpg?size=163x148&quality=96&sign=e8a176576b99dd084347ecb9cc754929&type=album",
        username: "АНАН",
        date: "11.11.2091",
        content: "ОМГ 0МГ ЗА 600 РУБЛЕЙ КЛАСС СПАСИБО!"
    },
    {
        id: 3,
        img: "https://sun9-22.userapi.com/impg/QiZyH70Ck_pQhMk4nDwy4jI_Feryo9_3aftWoQ/PSwSJ6qTxCM.jpg?size=1200x1169&quality=95&sign=a6d0fe791cbb2adc0ed0a838f4412be1&type=album",
        username: "ЧЕТКИЙ ВАНЕУК",
        date: "11.11.2091",
        content: "ОМГ 0МГ Я ЕБАЛ В РОТ РУБЛЕЙ КЛАСС СПАСИБО!"
    },
    {
        id: 4,
        img: "https://sun9-28.userapi.com/impg/QgaUIX7vEBlTnB5mT_3VwCqOYVwwwUwgTId-cw/Kdyz7Zhl5XM.jpg?size=2160x2160&quality=96&sign=8e727b359a465c045c88d852cc292e36&type=album",
        username: "ХУЕК",
        date: "11.11.2091",
        content: "ОМГ 0МГ ХРЮ ХРЮ"
    }
]

const ReviewSlider = (props) => {
    let reviews = reviewsTemplate.map((review) =>
    {
        return <Review img={review.img} username={review.username} date={review.date} content={review.content} key={review.id}/>
    })

    const [showBoxes, setShowBoxes] = React.useState(true);
    const onClick = () => setShowBoxes(!showBoxes);

    return(
        <div className={classes.box_group}>
            <div className={classes.group_title}>
                <div className={classes.group_wrapper}>
                    <div>{props.name}</div>
                    <img alt="" href="#" src={ListLunge} onClick={onClick}></img>
                </div>
                <div className={classes.group_delimiter}>
                    <div className={classes.delimiter_top}></div>
                    <div className={classes.delimiter_bot}>
                        <div className={classes.delimiter_vertical}></div>
                        <div className={classes.delimiter_center}>
                            <div></div>
                            <div></div>
                        </div>
                        <div className={classes.delimiter_vertical}></div>
                    </div>
                </div>
            </div>
            <div className={classes.group_content}>
                {showBoxes ? reviews : null }
            </div>
        </div>
    )
}

export default ReviewSlider;