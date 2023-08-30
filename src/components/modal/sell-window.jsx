import React, { useEffect, useState } from "react"
import { Loading } from '../сommon/button'
import classes from "./modal.module.css"

const SellWindow = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [blockRefresh, setBlockRefresh] = useState(false);
    const [applyCount, setApplyCount] = useState(0);
    const [allCount, setAllCount] = useState(0);

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
        <div className={classes.sell_window}>
            <div className={classes.sell_content}>
                <div className={classes.sell_tittle}>
                    <Loading isLoading={isLoading} click={() => {}}/>
                    <div className={classes.tittle}>Продажа предметов</div>
                </div>
                <div className={classes.sell_counter}>{applyCount + "/" + allCount}</div>
                <div className={classes.btn_main}>Продать</div>
            </div>
        </div>
    )
}

export default SellWindow;