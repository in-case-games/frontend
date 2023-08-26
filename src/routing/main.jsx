import React from "react"
import { Route, Routes } from "react-router-dom"
import { ItemRoulette } from '../components/item'
import {
    Email as EmailPage,
    Game as GamePage,
    Home as HomePage,
    NotFound as NotFoundPage,
    Profile as ProfilePage
} from "../pages"
import InfoRouting from "./info"


class Main extends React.Component {
    render() {
        return (
        <div className="main">
            <ItemRoulette/>
            <Routes>
                <Route path="/profile/*" element={<ProfilePage title="Профиль"/>}/>
                <Route path="/email/*" element={<EmailPage title="Подтверждение через почту"/>}/>
                <Route path="/info/*" element={<InfoRouting/>}/>
                <Route path="/game/:id" element={<GamePage title="Страница с кейсами"/>}/>
                <Route path="/" element={<HomePage title="Главная"/>}/>
                <Route path="*" element={<NotFoundPage title="Страница не найдена"/>}/>
            </Routes>
        </div>
        );
    }
}

export default Main;