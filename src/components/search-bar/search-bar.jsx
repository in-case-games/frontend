import React from "react";
import {Banner, Box, Star} from "../../assets/images/icon";
import classes from './search.module.css'
import SearchFilter from "./search-filter";

let goFuck = () => console.log("go fuck")

const SearchBar = () =>
{
    return(
        <div className={classes.search_section}>
            <input type="text" className={classes.search_bar} placeholder="Поиск"/>
            <div>
                <SearchFilter iconUri={Box}
                    buttonFunc={goFuck}
                />
                <SearchFilter iconUri={Banner}
                />
                <SearchFilter iconUri={Star}
                />
                <SearchFilter iconUri="https://psv4.userapi.com/c237331/u299329049/docs/d37/6eec55cad150/pngegg.png?extra=oct6iPr0GVZG2u4W9U1luEEsnDTtSxnhhAGLeR2zH1k1-E9_tmi12SRNT1n-oq8VHN3tQ7rDWCbIzIhO9fpi9mlfvwOA6_XTVHn_bxNVdIztTbM4OgEYnJfnSlroaH8l8vD_LZhbGr7S4sn2k6BGJ0VHwQ"
                />
            </div>
        </div>
    );
}

export default SearchBar;