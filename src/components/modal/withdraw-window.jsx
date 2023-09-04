import React, { useEffect, useState } from "react"
import { Item, User } from '../../services/api'
import StatusItem from '../item/status-item'
import { Loading } from '../сommon/button'
import Constants from './constants'
import classes from "./modal.module.css"

//TODO How game will more 5, then check count trade urls(add overflow-y)
const WithdrawWindow = (props) => {
    const [steamUrl, setSteamURL] = useState(Constants
        .CheckUndefinedNull(Constants.TradeURL["csgo"](), ""));
    const [error, setError] = useState(null);
    const [remainingInventories, setRemainingInventories] = useState({ items: [] });
    const [inventories, setInventories] = useState({ items: [] });

    const [isLoading, setIsLoading] = useState(true);
    const [isApply, setIsApply] = useState(false);
    const [bannedRefresh, setBannedRefresh] = useState(false);
    const [showSteamURL, setShowSteamURL] = useState(false);
    const [showSendButton, setShowSendButton] = useState(false);

    const showUrls = {
        "dota2": (show) => setShowSteamURL(show),
        "csgo": (show) => setShowSteamURL(show)
    };

    const isShowInput = {
        "dota2": showSteamURL,
        "csgo": showSteamURL
    };

    const inputSteamURLClick = (value) => {
        setSteamURL(value);

        if(Constants.Regex["csgo"].test(value)) { 
            setError(null);
            Constants.UpdateTradeURL["csgo"](value);
        }
    }

    const sendClick = () => {
        const games = Object.keys(showUrls)

        let error = null;

        for(let i = 0; i < games.length; i++) {
            let game = games[i];

            if(isShowInput[game] === true && !Constants.IsRegexTradeURL(game))  {
                error = "Проверьте корректность ссылки на обмен";
                setError(error);
                break;
            }
        }

        if(error === null) { 
            setBannedRefresh(true);
            setIsLoading(true);
            setShowSendButton(false);
            withdrawLoader();
        }
    };

    const withdrawLoader = async () => {
        const itemApi = new Item();
        let temp = inventories.items;

        for(let i = 0; i < temp.length; i++) {
            if(temp[i].status !== "success") {
                temp[i].status = "wait";
                temp[i].error = null;
                setInventories(previousInputs => ({...previousInputs, items: temp }));
            }
        }

        for(let i = 0; i < temp.length; i++) {
            const inventory = temp[i];
            
            try {
                if(inventory.status !== "success") {
                    temp[i].status = "loading";
                    setInventories(previousInputs => ({...previousInputs, items: temp }));

                    const index = props.selectItems.items.indexOf(inventory.id);
                
                    await itemApi
                        .withdrawItem(inventory.id, Constants.TradeURL[inventory.item.game]());
    
                    temp[i].status = "success";
    
                    setInventories(previousInputs => ({...previousInputs, items: temp }));
                    removeSelectItem(index, inventory);
                }
            }
            catch(err) { 
                const code = err.response.data.error.code;

                temp[i].status = "cancel";
                temp[i].error = Constants.WithdrawErrors[code] === undefined ? 
                    "Подождите или напишите в тех. поддержку" : 
                    Constants.WithdrawErrors[code];
                
                setInventories(previousInputs => ({...previousInputs, items: temp }));

                if(code === 4) {
                    const index = props.selectItems.items.indexOf(inventory.id);

                    temp.push(inventory);
                    
                    removeSelectItem(index, inventory);
                }
                else if(code === 5) 
                {
                    temp[i].status = "exchange";

                    setInventories(previousInputs => ({...previousInputs, items: temp }));
                }
                else break;
            };
        }
        setIsLoading(false);
        setBannedRefresh(false);
    };

    const removeSelectItem = (index, inventory) => {
        if(props.selectItem === inventory.id) props.setSelectItem(null);
        else if(index > -1) {
            let tempSelectItems = props.selectItems.items;
            tempSelectItems.splice(index, 1); 
            props.setSelectItems({...props.selectItems, ...tempSelectItems});
        }
    } 

    useEffect(() => {
        const interval = setInterval(async () => {
            const withdrawnNot = inventories.items.filter(i => i.status !== "success");
            setRemainingInventories({...remainingInventories, items: withdrawnNot});

            if(inventories.items.length > 0 && !bannedRefresh) {
                let showSendButton = withdrawnNot.length > 0;

                inventories.items.forEach(i => {
                    const showUrl = !Constants.IsRegexTradeURL(i.item.game);
                    showSendButton &&= !showUrl;

                    showUrls[i.item.game](showUrl);
                });

                setIsApply(withdrawnNot.length === 0);
                setShowSendButton(showSendButton);
            }
        }, 100);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            if(inventories.items.length === 0 && !bannedRefresh) {
                setBannedRefresh(true);
                setIsLoading(true);

                const itemApi = new Item();
                const userApi = new User();
                let ids = [];
                
                if(props.selectItem === null && props.selectItems.items.length === 0) 
                    ids = props.pullPrimaryInventory().map(i => i.id);
                else if(props.selectItem === null) 
                    ids = props.selectItems.items;
                else if(props.selectItem !== null) 
                    ids.push(props.selectItem);

                const inventories = await userApi.getInventoriesByIds(ids);
                
                const inventoriesAdditional = await itemApi
                    .getItemsByInventory(inventories, 0, inventories.length);

                inventoriesAdditional.forEach((i) => {
                    i.status = "wait"; 
                    i.error = null;
                });
                
                setInventories({ ...inventories, items: inventoriesAdditional });

                setIsLoading(false);
                setBannedRefresh(false);
            }
        }, 100);

        return () => clearInterval(interval);
    });

    return(
        <div className={classes.withdraw_window}>
            <div className={classes.withdraw_content}>
                <div className={classes.withdraw_tittle}>
                    <Loading isLoading={isLoading} click={() => {}}/>
                    <div className={classes.tittle}>Вывод предметов</div>
                </div>
                { 
                    inventories.items.length > 0 ? 
                    <div className={classes.withdraw_counter}>
                        {inventories.items.length - remainingInventories.items.length + "/" + inventories.items.length}
                    </div> : null 
                }
                {
                    error !== null ? 
                    <div className={classes.sell_error}>{error}</div> : null
                }
                {
                    showSteamURL ?
                    <input 
                        maxLength={200}
                        className={classes.input_form} 
                        placeholder="Steam TradeURL" 
                        value={steamUrl} 
                        onInput={e => inputSteamURLClick(e.target.value)} name="trade-url"
                    /> : 
                    null
                }
                {
                    showSendButton ?
                    <div className={classes.btn_main} onClick={() => sendClick()}>Вывести</div> :
                    null
                }
                {
                    isApply ? 
                    <div className={classes.description}>Все предметы отправлены :)<br/>Для просмотра статуса, перейдите в выводы</div> :
                    null
                }
                {
                    inventories.items.length > 0 ?
                    <div className={classes.delimiter_first}></div> :
                    null
                }
                <div className={classes.withdraw_items} style={inventories.items.length > 3 ? {overflowY: "scroll"} : {overflowY: 'hidden'}}>
                    {
                        inventories.items.map(i => 
                            <StatusItem 
                                id={i.id} 
                                item={i.item} 
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

export default WithdrawWindow;