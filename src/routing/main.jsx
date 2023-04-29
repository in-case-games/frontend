import React from "react";
import {Routes, Route} from "react-router-dom";
import { Home as HomePage } from "../pages/home";
import { NotFound as NotFoundPage } from "../pages/errors";


class Main extends React.Component {
    render() {
        return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        );
    }
}

export default Main;