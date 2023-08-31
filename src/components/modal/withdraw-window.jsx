import React, { useEffect, useState } from "react"
import { bake_cookie, delete_cookie, read_cookie } from 'sfcookies'
import { LogoMen } from "../../assets/images/icon"
import Item from '../../services/api/item'
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const WithdrawWindow = (props) => {
    const regex = /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/i;
    const steamURLCookie = read_cookie("user-steam-url");

    const [steamUrl, setSteamURL] = useState(steamURLCookie);

    const [applyCount, setApplyCount] = useState(0);
    const [allCount, setAllCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [bannedRefresh, setBannedRefresh] = useState(false);
    const [showSteamURL, setShowSteamURL] = useState(true);
    const [showSendButton, setShowSendButton] = useState(regex.test(steamURLCookie));

    const inputSteamURLClick = (value) => {
        setSteamURL(value);
        setShowSendButton(regex.test(value));
        bake_cookie("user-steam-url",value);
    }
    const sendClick = () => {
        const itemApi = new Item();
        const url = read_cookie("user-steam-url");

        if(url.length !== 0) {
            if(regex.test(url)) { 
                setBannedRefresh(true);
                setShowSteamURL(false) 
            }
            else {
                delete_cookie("user-steam-url");
            }
        };
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if(allCount === 0 && !bannedRefresh) {
                if(props.selectItem === null && props.selectItems.items.length === 0) 
                    setAllCount(props.primaryInventory.length);
                else if(props.selectItem === null) 
                    setAllCount(props.selectItems.items.length);
                else if(props.selectItem !== null) setAllCount(1);
                
                setIsLoading(false);
            }
        }, 10);

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
                    allCount > 0 ? 
                    <div className={classes.withdraw_counter}>{applyCount + "/" + allCount}</div> : null 
                }
                {
                    allCount > 0 && showSteamURL ?
                    <input 
                        className={classes.input_form} 
                        placeholder="Steam TradeURL" 
                        value={steamUrl} 
                        onInput={e => inputSteamURLClick(e.target.value)} name="trade-url"
                    /> : null
                }
                {
                    allCount > 0 && showSendButton ?
                    <div className={classes.btn_main} onClick={() => sendClick()}>Вывести</div> :
                    null
                }
                {
                    allCount === 0 ? 
                    <div className={classes.description}>Все предметы отправлены :)<br/>Для просмотра статуса, перейдите в историю вывода</div> :
                    null
                }
                {
                    showSteamURL ? 
                    <img className={classes.logo} alt="" href="/#" src={LogoMen}/> : null
                }
            </div>
        </div>
    )
}

export default WithdrawWindow;