import React, { useEffect, useState } from "react"
import { Item } from '../../services/api'
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const SellWindow = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [bannedRefresh, setBannedRefresh] = useState(false);

    const [applyCount, setApplyCount] = useState(0);
    const [inventories, setInventories] = useState([]);

    const [error, setError] = useState(null);
    const [showSendButton, setShowSendButton] = useState(applyCount !== inventories.length);

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
        let temp = applyCount;

        for(let i = 0; i < inventories.length; i++) {
            const id = inventories[i];
            const index = props.selectItems.items.indexOf(id);

            try {
                await itemApi.sellItem(id);
            }
            catch(err) { 
                setError("Внутренняя ошибка, попробуйте еще раз");
            }
            finally {
                temp += 1;
                
                removeSelectItem(index,id);
                setApplyCount(temp);
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
            if(inventories.length > 0 && !bannedRefresh) {
                setShowSendButton(applyCount !== inventories.length);
            }
        }, 100);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            if(inventories.length === 0 && !bannedRefresh) {
                setBannedRefresh(true);
                setIsLoading(true);
                let ids = [];
                
                if(props.selectItem === null && props.selectItems.items.length === 0) 
                    ids = props.pullPrimaryInventory().map(i => i.id);
                else if(props.selectItem === null) 
                    ids = props.selectItems.items;
                else if(props.selectItem !== null) 
                    ids.push(props.selectItem);

                setInventories(ids);
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
                <div className={classes.sell_counter}>{applyCount + "/" + inventories.length}</div>
                {
                    error !== null ? 
                    <div className={classes.sell_error}>{error}</div> : null
                }
                {
                    applyCount === inventories.length && !bannedRefresh && isLoading === false && error === null ? 
                    <div className={classes.description}>Все предметы проданы :)</div> :
                    null
                }
                {
                    showSendButton ? 
                    <div className={classes.btn_main} onClick={() => sellClick()}>Продать</div> :
                    null
                }
            </div>
        </div>
    )
}

export default SellWindow;