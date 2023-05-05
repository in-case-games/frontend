import React from "react";
import Game from "./game";
import Group from "../group/group";

const GameGroup = (props) => {

    const games = props.games?.map((game) => <Game game={game} key={game.id}/>);

    return(
        <Group name={props.name} items={games}/>
    );
};

export default GameGroup;