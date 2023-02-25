import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function ApplicationRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/email/*" element={<h1>PodmarshrutEmail</h1>}/>
				<Route path="/" element={<h1>Index</h1>}/>
				<Route path="*" element={<h1>NotFound</h1>}/>
			</Routes>
		</BrowserRouter>
)}

export default ApplicationRoutes;