import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmailRoutes from "./email.routes";
import ErrorNotFound from "../components/error/error.notFound"

function ApplicationRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/email/*" element={<EmailRoutes/>}/>
				<Route path="/" element={<h1>Index</h1>}/>
				<Route path="*" element={<ErrorNotFound/>}/>
			</Routes>
		</BrowserRouter>
)}

export default ApplicationRoutes;