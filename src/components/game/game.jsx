import React from "react"
import { useNavigate } from "react-router-dom"
import classes from "./game.module.css"
const Game = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.game.link);
    };
    return(
        <div className={classes.game} onClick={handleClick}>
            <img alt="" href="#" src={props.game.image}></img>
            <div className={classes.game_delimiter}></div>
        </div>
    );
};

export default Game;