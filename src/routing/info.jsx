import React from "react";
import {Routes, Route} from "react-router-dom";
import {Info as InfoPage} from "../pages/info";


class InfoRouting extends React.Component {
    render() {
        return (
            <Routes>
                <Route path=":id" element={<InfoPage title="Информация"/>}/>
                <Route path="*" element={<InfoPage title="Информация"/>}/>
            </Routes>
        );
    }
}

export default InfoRouting;