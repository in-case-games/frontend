import React from "react";
import {Banner, Box, Star} from "../../assets/images/icon";
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
                    iconUri={Box}
                    buttonFunc={goFuck}
                />
                <SearchFilter iconUri={Banner}/>
                <SearchFilter iconUri={Star}/>
            </div>
        </div>
    );
}

export default SearchBar;