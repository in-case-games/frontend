import React from "react";
import App from "./App";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/zeroing.css";
import "./assets/styles/fonts.css";
import "./assets/styles/main.css";
import "./assets/styles/button.css";


const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);