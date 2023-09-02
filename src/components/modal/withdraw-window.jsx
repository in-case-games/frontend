import React, { useEffect, useState } from "react"
import { bake_cookie, delete_cookie } from 'sfcookies'
import { Item, User } from '../../services/api'
import { Loading } from '../сommon/button'
import Constants from './constants'
import classes from "./modal.module.css"

const WithdrawWindow = (props) => {
    const [steamUrl, setSteamURL] = useState(Constants.Cookie["csgo"]());
    const [error, setError] = useState(null);

    const [inventories, setInventories] = useState({ items: [] });

    const [isLoading, setIsLoading] = useState(true);
    const [bannedRefresh, setBannedRefresh] = useState(false);
    const [showSteamURL, setShowSteamURL] = useState(false);
    const [showSendButton, setShowSendButton] = useState(false);
    const [remainingInventories, setRemainingInventories] = useState({ items: [] });

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
        let temp = inventories.items;

        for(let i = 0; i < temp.length; i++) {
            const inventory = temp[i];
            
            try {
                console.log(inventory);
                if(inventory.status !== "withdrawn") {
                    const index = props.selectItems.items.indexOf(inventory.id);
                
                    await itemApi
                        .withdrawItem(inventory.id, Constants.Cookie[inventory.item.game]());
    
                    temp[i].status = "withdrawn";
    
                    setInventories(previousInputs => ({...previousInputs, items: temp }));
                    removeSelectItem(index, inventory);
                }
            }
            catch(err) { 
                temp[i].status = "cancel";

                setInventories(previousInputs => ({...previousInputs, items: temp }));

                const code = err.response.data.error.code;
                const inventory = inventories[i];

                if(code === 4) {
                    const index = props.selectItems.items.indexOf(inventory.id);

                    temp.push(inventory);
                    
                    removeSelectItem(index, inventory);
                    
                    setError("Внутренняя ошибка, попробуйте еще раз");
                }
                else if(code === 5) 
                {
                    temp[i].status = "exchange";

                    setInventories(previousInputs => ({...previousInputs, items: temp }));
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
            setRemainingInventories({...remainingInventories, items: inventories.items.filter(i => i.status !== "withdrawn")});

            if(inventories.items.length > 0 && !bannedRefresh) {
                let showSendButton = true && remainingInventories.items.length > 0;

                inventories.items.forEach(i => {
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

                for(let i = 0; i < inventoriesAdditional.length; i++) 
                    inventoriesAdditional[i].status = "wait";
                
                setInventories(previousInputs => 
                    ({...previousInputs, items: inventoriesAdditional }));
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
                    showSendButton ?
                    <div className={classes.btn_main} onClick={() => sendClick()}>Вывести</div> :
                    null
                }
                {
                    remainingInventories.items.length === 0 && !bannedRefresh && isLoading === false && error === null ? 
                    <div className={classes.description}>Все предметы отправлены :)<br/>Для просмотра статуса, перейдите в выводы</div> :
                    null
                }
                {
                    inventories.items.map(i => <div key={i.id}>{i.id}-{i.status}</div>)
                }
            </div>
        </div>
    )
}

export default WithdrawWindow;