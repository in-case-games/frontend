import React from "react";
import classes from "./review.module.css"

const Review = (props) => {
    return (
        <div className={classes.review}>
            <div className={classes.review_info}>
                <div className={classes.review_additional_info}>
                    <p className={classes.review_name}>{props.username}</p>
                    <p className={classes.reviewer_date}>{props.date}</p>
                </div>
                <img src={props.img}
                     alt="person"/>
            </div>
            <p className={classes.review_content}>
                {props.content}
            </p>
        </div>
    )
}

export default Review;