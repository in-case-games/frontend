import React from "react";
import LootBox from "../loot-box/loot-box";
import Group from "../group/group";

const BoxGroup = (props) => {

    const boxes = props.boxes?.map((box) => <LootBox box={box} key={box.id}/>);

    return(
        <Group name={props.name} items={boxes}/>
    );
};

export default BoxGroup;