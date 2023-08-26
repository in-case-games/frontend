import React, { useEffect, useState } from "react"
import { Item, User } from "../../services/api"
import BigItem from "./big-item"
import classes from './item.module.css'

const ItemRoulette = () => {
    const apiUser = new User();
    const apiItem = new Item();

    const[itemList, setItemList] = useState([]);
    const[isStartItemList, setIsStartItemList] = useState(true);

    useEffect(() => {
        const interval = setInterval(async () => {
          try {
              setIsStartItemList(false);
              const roulette = await apiUser
              .getRouletteOpenings();
              const items = await apiItem
              .getItemsByHistory(roulette);
              const result = items.map(history =>
              <BigItem 
                img={history.item.img}
                name={history.item.name}
                color={history.item.rarity}
                date={history.date}
                key={history.id}
              />);
              
              setItemList(result);
          } 
          catch (err) {
              setIsStartItemList(false);
          }
        }, (isStartItemList ? 100 : 5000));
  
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

export default React.memo(ItemRoulette);