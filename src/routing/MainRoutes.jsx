import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";


class MainRoutes extends React.Component {
    render() {
        return (
             <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
             </BrowserRouter>
        );
    }
}

export default MainRoutes;