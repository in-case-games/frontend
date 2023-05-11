import React from "react";
import {Routes, Route} from "react-router-dom";
import { Home as HomePage } from "../pages/home";
import { NotFound as NotFoundPage } from "../pages/errors";
import { Game as GamePage } from "../pages/game";
import { Email as EmailPage } from "../pages/email";
import InfoRouting from "./info";


class Main extends React.Component {
    render() {
        return (
        <Routes>
            <Route path="/email/*" element={<EmailPage title="Подтверждение через почту"/>}/>
            <Route path="/info/*" element={<InfoRouting/>}/>
            <Route path="/game/:id" element={<GamePage title="Страница с кейсами"/>}/>
            <Route path="/" element={<HomePage title="Главная"/>}/>
            <Route path="*" element={<NotFoundPage title="Страница не найдена"/>}/>
        </Routes>
        );
    }
}

export default Main;