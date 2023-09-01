import React, { useEffect, useState } from "react"
import { bake_cookie, delete_cookie } from 'sfcookies'
import { Item, User } from '../../services/api'
import { Loading } from '../сommon/button'
import Constants from './constants'
import classes from "./modal.module.css"

const WithdrawWindow = (props) => {
    const [steamUrl, setSteamURL] = useState(Constants.Cookie["csgo"]());
    const [error, setError] = useState(null);

    const [withdrawnInventories, setWithdrawnInventories] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [exchangedInventories, setExchangedInventories] = useState([]);
    const [showStatusItem, setShowStatusItem] = useState({
        color: null,
        item: null
    });

    const [isLoading, setIsLoading] = useState(true);
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
        
        const regex = Constants.Regex["csgo"];

        if(regex.test(value)) { 
            setError(null);
            bake_cookie("user-steam-url", value); 
        }
        else delete_cookie("user-steam-url");
    }

    const sendClick = () => {
        const games = Object.keys(showUrls)

        let error = null;

        games.forEach(g => {
            if(isShowInput[g] === true) {
                if(!Constants.isRegexCookie(g)) error = `Проверьте корректность ссылки на обмен`;
            }
        });

        if(error === null) { 
            setError(null);
            setBannedRefresh(true);
            setIsLoading(true);
            setShowSendButton(false);
            withdrawLoader();
            setIsLoading(false);
            setBannedRefresh(false);
        }
        else setError(error);
    };

    const withdrawLoader = async () => {
        const itemApi = new Item();
        let temp = withdrawnInventories;

        for(let i = 0; i < inventories.length; i++) {
            const inventory = inventories[i];
            setTimeout(function(){
                setShowStatusItem(previousInputs => ({...previousInputs, color: "gray" }));
                setShowStatusItem(previousInputs => ({...previousInputs, item: inventory }));
            }, 300);
            
            try {
                const index = props.selectItems.items.indexOf(inventory.id);
                
                await itemApi.withdrawItem(inventory.id, Constants.Cookie[inventory.item.game]());

                setShowStatusItem(previousInputs => ({...previousInputs, color: "green" }));
                
                temp.push(inventory);

                removeSelectItem(index, inventory);
                setWithdrawnInventories(temp);
            }
            catch(err) { 
                setShowStatusItem(previousInputs => ({...previousInputs, color: "red" }));

                const code = err.response.data.error.code;
                const inventory = inventories[i];
                const findExchangedInventory = exchangedInventories.find(ei => ei.id === inventory.id);
                const tempExchanged = exchangedInventories;

                if(code === 4) {
                    const index = props.selectItems.items.indexOf(inventory.id);

                    temp.push(inventory);
                    
                    removeSelectItem(index, inventory);
                    setWithdrawnInventories(temp);

                    setError("Внутренняя ошибка, попробуйте еще раз");
                }
                else if(code === 5 && findExchangedInventory === undefined) 
                {
                    tempExchanged.push(inventory);
                    setExchangedInventories(tempExchanged);
                    setError("Есть предметы с нестабильной ценой");
                }
                else if(code === 2) {
                    setError("Подождите и повторите позже, выполняется перевод средств");
                    break;
                }
                else {
                    setError("Подождите или напишите в тех. поддержку");
                    break;
                }
            };
        }
        setTimeout(function(){
            setShowStatusItem(previousInputs => ({...previousInputs, item: null }));
        }, 500);
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
            if(inventories.length > 0 && !bannedRefresh) {
                let showSendButton = true && withdrawnInventories.length !== inventories.length;

                inventories.forEach(i => {
                    const showUrl = !Constants.isRegexCookie(i.item.game);
                    showSendButton &&= !showUrl;

                    showUrls[i.item.game](showUrl);
                });

                setShowSendButton(showSendButton);
            }
        }, 100);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            if(inventories.length === 0 && !bannedRefresh) {
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

                setInventories(inventoriesAdditional);
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
                    inventories.length > 0 ? 
                    <div className={classes.withdraw_counter}>
                        {withdrawnInventories.length + "/" + inventories.length}
                    </div> : null 
                }
                {
                    error !== null ? 
                    <div className={classes.withdraw_error}>{error}</div> : null
                }
                {
                    showSteamURL ?
                    <input 
                        className={classes.input_form} 
                        placeholder="Steam TradeURL" 
                        value={steamUrl} 
                        onInput={e => inputSteamURLClick(e.target.value)} name="trade-url"
                    /> : 
                    null
                }
                {
                    showStatusItem.item !== null ? 
                    <div style={{color: `${showStatusItem.color}`}}>
                        {showStatusItem.item.id}
                    </div>
                    : null
                }
                {
                    exchangedInventories.map(i => <div key={i.id}>{i.id}</div>)
                }
                {
                    showSendButton ?
                    <div className={classes.btn_main} onClick={() => sendClick()}>Вывести</div> :
                    null
                }
                {
                    inventories.length === withdrawnInventories.length && !bannedRefresh && isLoading === false && error === null ? 
                    <div className={classes.description}>Все предметы отправлены :)<br/>Для просмотра статуса, перейдите в выводы</div> :
                    null
                }
            </div>
        </div>
    )
}

export default WithdrawWindow;