import React from "react";
import { Routes, Route } from "react-router-dom";
import { Info as InfoPage } from "../pages/info";

const Info = () => (
  <Routes>
    <Route path=":id" element={<InfoPage />} />
    <Route path="*" element={<InfoPage />} />
  </Routes>
);

export default Info;
