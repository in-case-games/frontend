import React from "react";
import { FlagRUS, ListLunge } from "../../../assets/images/icon";

const Language = () => {
    return (
        <div className="btn-lang">
            <img alt="" src={FlagRUS}></img>
            <div>RU</div>
            <img alt="" src={ListLunge}></img>
        </div>
    );
};

export default Language;