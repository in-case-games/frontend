import React from "react";
import { Group } from "../../../layouts/group";
import { Small as Item } from "../../game-item";

const BoxItems = (props) => {
  const items = props.items?.map((i) => (
    <Item
      item={i.item}
      showWindow={() => {
        props.showInventoryWindow(i.boxId ? i : {});
      }}
      key={i.id}
    />
  ));

  return <Group name="Содержимое кейса">{items}</Group>;
};

export default React.memo(BoxItems);
