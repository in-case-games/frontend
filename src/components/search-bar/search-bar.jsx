import React from "react"
import { Banner, BoxOrange, Gun } from "../../assets/images/icon"
import SearchFilter from "./search-filter"
import classes from './search.module.css'

const SearchBar = () => {
    return (
        <div className={classes.search_section}>
            <input
                type="text"
                className={classes.search_bar}
                placeholder="Поиск"
            />
            <div>
                <SearchFilter iconUri={BoxOrange} />
                <SearchFilter iconUri={Gun} />
                <SearchFilter iconUri={Banner} />
            </div>
        </div>
    )
}

export default SearchBar