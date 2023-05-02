import React from "react";
import {Routes, Route} from "react-router-dom";
import { Home as HomePage } from "../pages/home";
import { NotFound as NotFoundPage } from "../pages/errors";
import { Info as InfoPage } from "../pages/info";


class Main extends React.Component {
    render() {
        return (
        <Routes>
            <Route path="/info" element={<InfoPage title="Информация"/>}/>
            <Route path="/" element={<HomePage title="Главная"/>}/>
            <Route path="*" element={<NotFoundPage title="Страница не найдена"/>}/>
        </Routes>
        );
    }
}

export default Main;