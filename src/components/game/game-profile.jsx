import React from 'react'
import classes from "./game.module.css"

const GameProfile = (props) => {
		const handleClick = () => {
			
		};

		return(
				<div className={classes.game_profile} onClick={handleClick}>
						<img alt="" href="#" src={props.game.image}></img>
						<div className={classes.game_delimiter}></div>
				</div>
		);
};

export default GameProfile;