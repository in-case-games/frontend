import React from "react";
import {Routes, Route} from "react-router-dom";
import { Home as HomePage } from "../pages/home";
import { NotFound as NotFoundPage } from "../pages/errors";
import InfoRouting from "./info";


class Main extends React.Component {
    render() {
        return (
        <Routes>
            <Route path="/info/*" element={<InfoRouting/>}/>
            <Route path="/" element={<HomePage title="Главная"/>}/>
            <Route path="*" element={<NotFoundPage title="Страница не найдена"/>}/>
        </Routes>
        );
    }
}

export default Main;