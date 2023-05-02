import React from "react";
import {Banner, BoxYellow, Gun} from "../../assets/images/icon";
import classes from './search.module.css'
import SearchFilter from "./search-filter";

let goFuck = () => console.log("go fuck")

const SearchBar = () =>
{
    return(
        <div className={classes.search_section}>
            <input 
                type="text" 
                className={classes.search_bar} 
                placeholder="Поиск"
            />
            <div>
                <SearchFilter 
                    iconUri={BoxYellow}
                    buttonFunc={goFuck}
                />
                <SearchFilter iconUri={Gun}/>
                <SearchFilter iconUri={Banner}/>
            </div>
        </div>
    );
}

export default SearchBar;