import React from "react"
import { Banner as BannerImg } from '../../assets/images/additional'
import classes from './banner.module.css'
const Banner = () => {
    return(
      <div className={classes.banner}>
          <img alt="banner" src={BannerImg} className={classes.banner_content}/>
      </div>
    );
}

export default Banner;