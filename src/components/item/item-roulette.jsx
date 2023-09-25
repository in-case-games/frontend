import React, { useEffect, useState } from "react"
import { Item, User } from "../../services/api"
import BigItem from "./big-item"
import classes from './item.module.css'

const ItemRoulette = () => {
  const apiUser = new User()
  const apiItem = new Item()

  const [itemList, setItemList] = useState([])
  const [isStartItemList, setIsStartItemList] = useState(true)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setIsStartItemList(false)

        const roulette = await apiUser
          .getRouletteOpenings()
        const history = await apiItem
          .getItemsByHistory(roulette)

        for (let i = 0; i < history.length; i++) {
          history[i].item = await apiItem.pullItemWithImage(history[i].item)
        }

        const result = history.map(h =>
          <BigItem
            image={h.item.image}
            name={h.item.name}
            color={h.item.rarity}
            date={h.date}
            key={h.id}
          />)

        setItemList(result)
      }
      catch (err) {
        setIsStartItemList(false)
      }
    }, (isStartItemList ? 100 : 5000))

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className={classes.item_roulette}>
      {itemList}
    </div>
  )
}

export default React.memo(ItemRoulette)