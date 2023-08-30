import React, { useEffect, useState } from "react"
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"
//import { bake_cookie, read_cookie } from 'sfcookies'

const WithdrawWindow = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [blockRefresh, setBlockRefresh] = useState(false);
    const [applyCount, setApplyCount] = useState(0);
    const [allCount, setAllCount] = useState(0);
    const [tradeURL, setTradeURL] = useState("");

    useEffect(() => {
        const interval = setInterval(async () => {
            if(allCount === 0 && !blockRefresh) {
                if(props.selectItem === null && props.selectItems.items.length === 0) 
                    setAllCount(props.primaryInventory.length);
                else if(props.selectItem === null) 
                    setAllCount(props.selectItems.items.length);
                else 
                    setAllCount(1);
                
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
                <div className={classes.withdraw_counter}>{applyCount + "/" + allCount}</div>
                <input className={classes.input_form} placeholder="Steam TradeURL" value={tradeURL} onInput={e => setTradeURL(e.target.value)} name="trade-url"/>
                <div className={classes.btn_main}>Вывести</div>
            </div>
        </div>
    )
}

export default WithdrawWindow;