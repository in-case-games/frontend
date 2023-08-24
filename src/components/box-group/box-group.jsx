import React from "react"
import Group from "../group/group"
import LootBox from "../loot-box/loot-box"

const BoxGroup = (props) => {
    const boxes = props.boxes?.map((box) => <LootBox box={box} key={box.id}/>);

    return(
        <Group name={props.name} items={boxes}/>
    );
};

export default BoxGroup;