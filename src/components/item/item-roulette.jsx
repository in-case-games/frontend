import React, { useEffect, useState } from "react"
import { Item, User } from "../../services/api"
import { ItemWindow, LoadImageWindow, MiniProfileWindow, Modal } from '../modal'
import BigItem from "./big-item"
import classes from './item.module.css'

const ItemRoulette = () => {
  const apiUser = new User()
  const apiItem = new Item()

  const [miniProfile, setMiniProfile] = useState(null)
  const [itemList, setItemList] = useState([])
  const [isStartItemList, setIsStartItemList] = useState(true)

  const [item, setItem] = useState(null)
  const [file, setFile] = useState()
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setIsStartItemList(false)

        const urlSplit = window.location.href.split("/")
        let roulette = []

        if (urlSplit.at(-2) === "box") {
          try {
            roulette = await apiUser.getRouletteOpeningsByBoxId(urlSplit.at(-1))
          }
          catch (err) {
            roulette = await apiUser.getRouletteOpenings()
          }
        }
        else {
          roulette = await apiUser.getRouletteOpenings()
        }

        const history = await apiItem
          .getItemsByHistory(roulette)

        for (let i = 0; i < history.length; i++) {
          history[i].item = await apiItem.pullItemWithImage(history[i].item)
        }

        const result = history.map(h =>
          <BigItem
            userId={h.userId}
            boxId={h.boxId}
            showMiniProfile={() => setMiniProfile(h.userId)}
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
    }, (isStartItemList ? 1000 : 5000))

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className={classes.item_roulette}>
      {itemList}
      <Modal
        active={miniProfile}
        clickChange={() => setMiniProfile(null)}
        content={
          <MiniProfileWindow
            userId={miniProfile}
            openItemWindow={(item) => setItem(item)}
            exchangeWindow={(id) => setMiniProfile(id)}
          />
        }
      />
      <Modal
        active={item}
        clickChange={() => {
          setItem(null)
          setFile()
        }}
        content={
          <ItemWindow
            item={item}
            image={file}
            setImage={setFile}
            setItem={setItem}
            resetImage={() => setFile()}
            openLoadWindow={setIsOpenLoadWindow}
          />
        }
      />
      <Modal
        active={isOpenLoadWindow}
        clickChange={_ => setIsOpenLoadWindow(false)}
        content={
          <LoadImageWindow
            file={file}
            setFile={setFile}
            width={200}
            height={200}
            sizeMb={1}
            regular={/\.(png)$/}
            description={"PNG (MAX. 200x200px | 1MB)"}
          />
        }
      />
    </div>
  )
}

export default React.memo(ItemRoulette)