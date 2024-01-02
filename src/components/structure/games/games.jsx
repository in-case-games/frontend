import React from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "../../../layouts/group";
import { Game } from "../../game";
import Constants from "../../../constants";

const Games = () => {
  const navigate = useNavigate();

  const games = Constants.Games.map((g) => (
    <Game click={() => navigate(g.link)} image={g.image} key={g.id} />
  ));

  return <Group name="Лучший дроп в этих играх">{games}</Group>;
};

export default Games;
