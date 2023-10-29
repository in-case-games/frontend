import React from "react";
import { Group } from "../../../layouts/group";
import { Big as Box } from "../../loot-box";

const Boxes = (props) => {
  const boxes = props.boxes?.map((b) => <Box box={b} key={b.id} />);

  return <Group name={props.name}>{boxes}</Group>;
};

export default Boxes;
