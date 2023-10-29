import React from "react";
import { Routes, Route } from "react-router-dom";
import { Info as InfoPage } from "../pages/info";

class Info extends React.Component {
  render() {
    return (
      <Routes>
        <Route path=":id" element={<InfoPage />} />
        <Route path="*" element={<InfoPage />} />
      </Routes>
    );
  }
}

export default Info;
