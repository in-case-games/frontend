import React from "react";
import ItemLunge from "./item-lunge";

const ListLunge = (props) => {
    const items = props.items?.map((item) => <ItemLunge item={item} key={item.id}/>);
    return(props.isActive ?
        <div className="list-lunge">
            {items}
        </div> : null
    );
};

export default ListLunge;
