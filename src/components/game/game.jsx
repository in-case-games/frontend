import React from "react";
import classes from "./game.module.css";
import { useNavigate } from "react-router-dom";

const Game = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.link);
    };
    return(
        <div className={classes.game} onClick={handleClick}>
            <img alt="" href="#" src={props.game.image}></img>
            <div className={classes.game_delimiter}></div>
        </div>
    );
};

export default Game;