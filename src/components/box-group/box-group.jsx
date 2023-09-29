import React from "react"
import Group from "../group/group"
import { LootBoxBig } from "../loot-box"

const BoxGroup = (props) => {
    const boxes = props.boxes?.map((box) => <LootBoxBig box={box} key={box.id} />)

    return (
        <Group name={props.name} items={boxes} />
    )
}

export default BoxGroup