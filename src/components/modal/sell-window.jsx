import React, { useEffect, useState } from "react"
import { Item } from '../../services/api'
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const SellWindow = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [bannedRefresh, setBannedRefresh] = useState(false);

    const [inventories, setInventories] = useState({ items: [] });
    const [remainingInventories, setRemainingInventories] = useState({ items: [] });

    const [error, setError] = useState(null);
    const [showSendButton, setShowSendButton] = useState(false);

    const sellClick = () => {
        setError(null);
        setBannedRefresh(true);
        setIsLoading(true);
        setShowSendButton(false);
        sellLoader();
        setIsLoading(false);
        setBannedRefresh(false);
    };

    const sellLoader = async () => {
        const itemApi = new Item();
        const temp = inventories.items;

        for(let i = 0; i < temp.length; i++) {
            const id = temp[i].id;
            const index = props.selectItems.items.indexOf(id);

            try {
                await itemApi.sellItem(id);

                temp[i].status = "sold";
                setInventories(previousInputs => ({...previousInputs, items: temp }));
            }
            catch(err) { 
                console.log(err);
                console.log(id);
                temp[i].status = "cancel";
                setInventories(previousInputs => ({...previousInputs, items: temp }));
                setError("Внутренняя ошибка, попробуйте еще раз");
                break;
            }
            finally {
                removeSelectItem(index, id);
            }
        }
    };

    const removeSelectItem = (index, id) => {
        if(props.selectItem === id) props.setSelectItem(null);
        else if(index > -1) {
            let tempSelectItems = props.selectItems.items;
            tempSelectItems.splice(index, 1); 
            props.setSelectItems({...props.selectItems, ...tempSelectItems});
        }
    } 

    useEffect(() => {
        const interval = setInterval(async () => {
            setRemainingInventories({...remainingInventories, items: inventories.items.filter(i => i.status !== "sold")});
            if(inventories.items.length > 0 && !bannedRefresh) {
                setShowSendButton(remainingInventories.items.length !== 0);
            }
        }, 100);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            if(inventories.items.length === 0 && !bannedRefresh) {
                setBannedRefresh(true);
                setIsLoading(true);
                let ids = [];
                
                if(props.selectItem === null && props.selectItems.items.length === 0) 
                    ids = props.pullPrimaryInventory().map(i => i.id);
                else if(props.selectItem === null) 
                    ids = props.selectItems.items;
                else if(props.selectItem !== null) 
                    ids.push(props.selectItem);
                
                for(let i = 0; i < ids.length; i++) 
                    ids[i] = { id: ids[i], status: "wait"};
                
                setInventories(previousInputs => 
                    ({...previousInputs, items: ids }));
                setIsLoading(false);
                setBannedRefresh(false);
            }
        }, 10);

        return () => clearInterval(interval);
    });

    return(
        <div className={classes.sell_window}>
            <div className={classes.sell_content}>
                <div className={classes.sell_tittle}>
                    <Loading isLoading={isLoading} click={() => {}}/>
                    <div className={classes.tittle}>Продажа предметов</div>
                </div>
                {
                    inventories.items.length > 0 ? 
                    <div className={classes.sell_counter}>{inventories.items.length - remainingInventories.items.length + "/" + inventories.items.length}</div> :
                    null
                }
                {
                    error !== null ? 
                    <div className={classes.sell_error}>{error}</div> : null
                }
                {
                    remainingInventories.items.length === 0 && !bannedRefresh && isLoading === false && error === null ? 
                    <div className={classes.description}>Все предметы проданы :)</div> :
                    null
                }
                {
                    showSendButton ? 
                    <div className={classes.btn_main} onClick={() => sellClick()}>Продать</div> :
                    null
                }
                {
                    inventories.items.map(i => <div key={i.id}>{i.id}-{i.status}</div>)
                }
            </div>
        </div>
    )
}

export default SellWindow;