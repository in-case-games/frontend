import React from "react"
import Group from "../group/group"
import Game from "./game"

const GameGroup = (props) => {
    const games = props.games?.map((game) => <Game game={game} key={game.id}/>);

    return(
        <Group name={props.name} items={games}/>
    );
};

export default GameGroup;