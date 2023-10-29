import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound as NotFoundPage } from "../pages/not-found";
import { Email as EmailRouting } from ".";
import { Home as HomePage } from "../pages/home";
import { Game as GamePage } from "../pages/game";
import { Info as InfoRouting } from ".";
import { Profile as ProfilePage } from "../pages/profile";

class Main extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/email/*" element={<EmailRouting />} />
        <Route path="/info/*" element={<InfoRouting />} />
        <Route path="/game/:name" element={<GamePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default Main;
