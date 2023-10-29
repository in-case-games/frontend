import React from "react";
import App from "./App";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/zeroing";
import "./assets/styles/fonts";
import "./assets/styles/colors";
import "./assets/styles/main";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const devMode = process.env.NODE_ENV === "development";

if (devMode && module && module.hot) {
  module.hot.accept();
}
