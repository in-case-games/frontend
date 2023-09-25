import React, { useEffect, useState } from "react"
import { Item, User } from '../../services/api'
import StatusItem from '../item/status-item'
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const SellWindow = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bannedRefresh, setBannedRefresh] = useState(false)

    const [isApply, setIsApply] = useState(false)
    const [inventories, setInventories] = useState({ items: [] })
    const [remainingInventories, setRemainingInventories] = useState({ items: [] })
    const [showSendButton, setShowSendButton] = useState(false)

    const sellClick = () => {
        setBannedRefresh(true)
        setIsLoading(true)
        setShowSendButton(false)
        sellLoader()
    }

    const sellLoader = async () => {
        const itemApi = new Item()
        const temp = inventories.items

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].status !== "success") {
                temp[i].status = "wait"
                temp[i].error = null
                setInventories(previousInputs => ({ ...previousInputs, items: temp }))
            }
        }

        for (let i = 0; i < temp.length; i++) {
            const id = temp[i].id
            const index = props.selectItems.items.indexOf(id)

            try {
                if (temp[i].status !== "success") {
                    temp[i].status = "loading"
                    setInventories(previousInputs => ({ ...previousInputs, items: temp }))

                    await itemApi.sellItem(id)

                    temp[i].status = "success"
                    setInventories(previousInputs => ({ ...previousInputs, items: temp }))
                }
            }
            catch (err) {
                temp[i].status = "cancel"
                temp[i].error = "Внутренняя ошибка, попробуйте еще раз"
                setInventories(previousInputs => ({ ...previousInputs, items: temp }))
                break
            }
            finally {
                removeSelectItem(index, id)
            }
        }

        setIsLoading(false)
        setBannedRefresh(false)
    }

    const removeSelectItem = (index, id) => {
        if (props.selectItem === id) props.setSelectItem(null)
        else if (index > -1) {
            let tempSelectItems = props.selectItems.items
            tempSelectItems.splice(index, 1)
            props.setSelectItems({ ...props.selectItems, ...tempSelectItems })
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const soldNot = inventories.items.filter(i => i.status !== "success")
            setRemainingInventories({ ...remainingInventories, items: soldNot })

            if (inventories.items.length > 0 && !bannedRefresh) {
                setIsApply(soldNot.length === 0)
                setShowSendButton(soldNot.length > 0)
            }
        }, 10)

        return () => clearInterval(interval)
    })

    useEffect(() => {
        const interval = setInterval(async () => {
            if (inventories.items.length === 0 && !bannedRefresh) {
                setBannedRefresh(true)
                setIsLoading(true)

                const itemApi = new Item()
                const userApi = new User()
                let ids = []

                if (props.selectItem === null && props.selectItems.items.length === 0)
                    ids = props.pullPrimaryInventory().map(i => i.id)
                else if (props.selectItem === null)
                    ids = props.selectItems.items
                else if (props.selectItem !== null)
                    ids.push(props.selectItem)

                const inventories = await userApi.getInventoriesByIds(ids)

                const inventoriesAdditional = await itemApi
                    .getItemsByInventory(inventories, 0, inventories.length)

                inventoriesAdditional.forEach(async (i) => {
                    i.item = await itemApi.pullItemWithImage(i.item)
                    i.status = "wait"
                    i.error = null
                })

                setInventories({ ...inventories, items: inventoriesAdditional })
                setIsLoading(false)
                setBannedRefresh(false)
            }
        }, 10)

        return () => clearInterval(interval)
    })

    return (
        <div className={classes.sell_window}>
            <div className={classes.sell_content}>
                <div className={classes.sell_tittle}>
                    <Loading isLoading={isLoading} click={() => { }} cursor="default" />
                    <div className={classes.tittle}>Продажа предметов</div>
                </div>
                {
                    inventories.items.length > 0 ?
                        <div className={classes.sell_counter}>{inventories.items.length - remainingInventories.items.length + "/" + inventories.items.length}</div> :
                        null
                }
                {
                    isApply ?
                        <div className={classes.description}>Все предметы проданы :)</div> :
                        null
                }
                {
                    showSendButton ?
                        <div className={classes.btn_main} onClick={() => sellClick()}>Продать</div> :
                        null
                }
                {
                    inventories.items.length > 0 ?
                        <div className={classes.delimiter_first}></div> :
                        null
                }
                <div className={classes.sell_items} style={inventories.items.length > 3 ? { overflowY: "scroll" } : { overflowY: 'hidden' }}>
                    {
                        inventories.items.map(i =>
                            <StatusItem
                                id={i.id}
                                item={i.item}
                                cost={i.cost}
                                isLoading={isLoading}
                                status={i.status}
                                error={i.error}
                                key={i.id}
                            />)
                    }
                </div>
                {
                    inventories.items.length > 0 ?
                        <div className={classes.delimiter_second}></div> :
                        null
                }
            </div>
        </div>
    )
}

export default SellWindow