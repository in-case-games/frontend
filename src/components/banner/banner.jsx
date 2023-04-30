import React from "react";
import classes from './banner.module.css'

const Banner = () => {
    return(
      <div className={classes.banner}>
          <img alt="banner" src="https://sun9-80.userapi.com/impg/1LN3ybBq700hiM0cvqv1N_06FasCye1a2GgxSA/qLZemC1GB3I.jpg?size=699x316&quality=96&sign=94266ab66d039ab640fa75c42abfad11&type=album"
               className={classes.banner_content}/>
      </div>
    );
}

export default Banner;