import React, { useEffect, useState } from "react";
import classes from './item.module.css'
import BigItem from "./big-item";
import { User } from "../../services/api"

const ItemRoulette = () => {
    const apiUser = new User();

    const[itemList, setItemList] = useState([]);
    const[isFirstStart, setFirstStart] = useState(true);

    useEffect(() => {
        const interval = setInterval(async () => {
          try {
              const response = await apiUser.getLast100Openings();
              const responseSliced = response.slice(0, 20);
              const resultArray = responseSliced.map(history => <BigItem imgSrc={history.item.imageUri} itemName={history.item.name} color={history.item.rarity.name} key={history.id}/>);
              setFirstStart(false);
              setItemList(resultArray);
          } 
          catch (err) {
          }
        }, (isFirstStart ? 1 : 5000));
  
        return () => {
          clearInterval(interval);
        };
      });

    return(
        <div className={classes.item_roulette}>
            {itemList}
        </div>
    )
}

export default ItemRoulette;